import { ForbiddenException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { EntityManager, Transaction, TransactionManager } from 'typeorm'
import { HttpExceptionMessage } from '../../consts'
import { EmailStatus } from '../../consts/email'
import { hashPassword, validatePassword } from '../../utils/password.util'
import { AuthService } from '../auth/auth.service'
import {
  CreateUserRequestDTO,
  UpdateUserRequestDTO,
  UserChangePasswordDTO,
  UserCreateOneResponseDTO,
  UserEmailStatusDTO,
  UserResponseDTO,
  UserResponseWithPasswordDto
} from './user.interfaces'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {
  }

  private async throwExceptionIfEmailInUse(email: string): Promise<void> {
    const foundUserByEmail = await this.repository.findOneByEmail(email)
    if (foundUserByEmail) {
      throw new ForbiddenException(HttpExceptionMessage.user.emailAlreadyInUse)
    }
  }

  async findOneById(id: string): Promise<UserResponseDTO> {
    const user = await this.repository.findOneById(id)
    if (!user) {
      throw new NotFoundException()
    }
    return user
  }

  @Transaction()
  async createOne(dto: CreateUserRequestDTO,
                  @TransactionManager() entityManager?: EntityManager): Promise<UserCreateOneResponseDTO> {
    const { password, ...user } = dto
    await this.throwExceptionIfEmailInUse(dto.email)

    const hashedPassword = await hashPassword(password)
    const newUser = await this.repository.createOrUpdateOne({
      password: hashedPassword,
      ...user
    }, entityManager)

    return {
      user: UserResponseDTO.of(newUser),
      tokens: this.authService.generateTokensPair(newUser)
    }
  }

  async updateOne(dto: UpdateUserRequestDTO): Promise<UserResponseDTO> {
    if (dto.email) {
      await this.throwExceptionIfEmailInUse(dto.email)
    }

    await this.repository.createOrUpdateOne(dto)
    return this.findOneById(dto.id)
  }

  async removeOne(id: string): Promise<boolean> {
    const user = { id, isDeleted: true }
    try {
      await this.repository.createOrUpdateOne(user)
      return true
    } catch (e) {
      return false
    }
  }

  async findOneByEmailWithPassword(email: string): Promise<UserResponseWithPasswordDto | undefined> {
    const user = await this.repository.findOneByEmailWithPassword(email)
    return user ? UserResponseWithPasswordDto.of(user) : user
  }

  async findOneByEmail(email: string): Promise<UserResponseWithPasswordDto | undefined> {
    const user = await this.repository.findOneByEmail(email)
    return user ? UserResponseWithPasswordDto.of(user) : user
  }

  async findOneByIdWithPassword(id: string): Promise<UserResponseWithPasswordDto | undefined> {
    const user = await this.repository.findOneByIdWithPassword(id)
    return user ? UserResponseWithPasswordDto.of(user) : user
  }

  async changePassword(dto: UserChangePasswordDTO): Promise<UserResponseDTO> {
    const user = await this.findOneByIdWithPassword(dto.userId)
    if (!user) {
      throw new NotFoundException()
    }

    const hashedPreviousPassword = await hashPassword(dto.previousPassword)
    if (!validatePassword(user.password, hashedPreviousPassword)) {
      throw new ForbiddenException(HttpExceptionMessage.user.previousPasswordIsIncorrect)
    }

    const hashedNewPassword = await hashPassword(dto.newPassword)
    await this.repository.createOrUpdateOne({ id: dto.userId, password: hashedNewPassword })
    return user
  }

  async getEmailStatus(email: string): Promise<UserEmailStatusDTO> {
    const user = await this.findOneByEmail(email)
    if (!user) {
      return {
        status: EmailStatus.FREE
      }
    }
    if (!user.isEmailVerified) {
      return {
        status: EmailStatus.NOT_CONFIRMED
      }
    }
    return {
      status: EmailStatus.EXISTS
    }
  }

}
