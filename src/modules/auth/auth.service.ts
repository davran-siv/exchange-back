import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as c from 'config'
import { HttpExceptionMessage } from '../../consts/http-exception-message'
import { validatePassword } from '../../utils/password.util'
import { UserResponseDTO } from '../user/user.interfaces'
import { UserService } from '../user/user.service'
import { AuthJwtTokesDto, JwtRefreshTokenPayloadDto } from './interfaces/jwt.interface'
import { AuthLoginByCredentialsResponseDTO, LoginByCredentialsDto, RefreshTokenDto } from './interfaces/login.interface'
import uuid = require('uuid')

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {
  }

  async loginByCredentials(dto: LoginByCredentialsDto): Promise<AuthLoginByCredentialsResponseDTO> {
    const user = await this.userService.findOneByEmailWithPassword(dto.email)
    if (!user) {
      throw new UnauthorizedException(HttpExceptionMessage.auth.credentialsAreWrong)
    }
    if (!await validatePassword(dto.password, user.password)) {
      throw new UnauthorizedException(HttpExceptionMessage.auth.credentialsAreWrong)
    }
    const tokens = await this.generateTokensPair(user)
    return {
      user,
      tokens
    }
  }

  async refreshToken(dto: RefreshTokenDto): Promise<AuthJwtTokesDto> {
    const refreshTokenPayload = await this.jwtService.verifyAsync<JwtRefreshTokenPayloadDto>(dto.refreshToken)
                                          .catch(e => {
                                            throw new UnauthorizedException()
                                          })
    const user = await this.userService.findOneById(refreshTokenPayload.id)
    return this.generateTokensPair(user)
  }

  generateTokensPair(user: UserResponseDTO) {
    const accessToken = this.generateAccessToken(user)
    const refreshToken = this.generateRefreshToken(user.id)
    return {
      accessToken,
      refreshToken
    }
  }

  private generateAccessToken(user: UserResponseDTO): string {
    return this.jwtService.sign(this.getAccessTokenPayload(user), {
      expiresIn: c.get('jwtToken.accessTokenExpiresIn')
    })
  }

  private generateRefreshToken(userId: string): string {
    const jwtid = uuid.v4()
    return this.jwtService.sign({
      id: userId
    }, {
      jwtid,
      expiresIn: c.get('jwtToken.refreshTokenExpiresIn')
    })
  }

  private getAccessTokenPayload(user: UserResponseDTO) {
    return {
      id: user.id,
      email: user.email
    }
  }
}
