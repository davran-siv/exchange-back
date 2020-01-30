import { IsNotEmpty, IsString } from 'class-validator'
import { UserResponseDTO } from '../../user/user.interfaces'

export class LoginByCredentialsDto {
  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string
}

export interface AuthJwtTokesResponseDTO {
  accessToken: string
  refreshToken: string
}

export interface AuthLoginByCredentialsResponseDTO {
  user: UserResponseDTO
  tokens: AuthJwtTokesResponseDTO
}
