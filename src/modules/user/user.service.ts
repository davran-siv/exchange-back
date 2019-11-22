import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { EntityManager, Transaction, TransactionManager } from 'typeorm'
import { HttpExceptionMessage } from '../../consts'
import { hashPassword, validatePassword } from '../../utils/password.util'
import { CreateUserRequestDTO, UpdateUserRequestDTO, UserChangePasswordDTO, UserResponseDTO, UserResponseWithPasswordDto } from './user.interfaces'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository
  ) {
  }

  private async throwExceptionIfEmailInUse(emailAddress: string): Promise<void> {
    const foundUserByEmail = await this.repository.findOneByEmail(emailAddress)
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
                  @TransactionManager() entityManager?: EntityManager): Promise<UserResponseDTO> {
    const { password, ...user } = dto
    await this.throwExceptionIfEmailInUse(dto.emailAddress)

    const hashedPassword = await hashPassword(password)
    const newUser = await this.repository.createOrUpdateOne({
      password: hashedPassword,
      ...user
    }, entityManager)
    return UserResponseDTO.of(newUser)
  }

  async updateOne(dto: UpdateUserRequestDTO): Promise<UserResponseDTO> {
    if (dto.emailAddress) {
      await this.throwExceptionIfEmailInUse(dto.emailAddress)
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

  async findOneByEmailWithPassword(emailAddress: string): Promise<UserResponseWithPasswordDto | undefined> {
    const user = await this.repository.findOneByEmailWithPassword(emailAddress)
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
}
