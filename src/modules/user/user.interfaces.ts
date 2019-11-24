import { EmailStatus } from '../../consts/email'
import { UserEntity } from './user.entity'

export class CreateUserRequestDTO {
  readonly firstName: string
  readonly lastName: string
  readonly password: string
  readonly emailAddress: string
  readonly photo?: string
}

export class UpdateUserRequestDTO {
  readonly id: string
  readonly firstName?: string
  readonly lastName?: string
  readonly emailAddress?: string
  readonly photo?: string
}

export class UserResponseDTO {
  readonly id: string
  readonly firstName: string
  readonly lastName: string
  readonly emailAddress: string
  readonly photo: string | null
  readonly isEmailVerified: boolean

  constructor(model: UserEntity) {
    this.id = model.id
    this.firstName = model.firstName
    this.lastName = model.lastName
    this.emailAddress = model.emailAddress
    this.photo = model.photo
    this.isEmailVerified = model.isEmailVerified
  }

  static of(model: UserEntity): UserResponseDTO
  static of(model: UserEntity[]): UserResponseDTO[]

  static of(model: UserEntity | UserEntity[]): UserResponseDTO | UserResponseDTO[] {
    return model instanceof Array ? model.map(it => new UserResponseDTO(it)) : new UserResponseDTO(model)
  }
}

export class UserResponseWithPasswordDto extends UserResponseDTO {
  readonly password: string

  constructor(model: UserEntity) {
    super(model)
    this.password = model.password
  }

  static of(model: UserEntity): UserResponseWithPasswordDto
  static of(model: UserEntity[]): UserResponseWithPasswordDto[]

  static of(model: UserEntity | UserEntity[]): UserResponseWithPasswordDto | UserResponseWithPasswordDto[] {
    return model instanceof Array
      ? model.map(it => new UserResponseWithPasswordDto(it))
      : new UserResponseWithPasswordDto(model)
  }
}

export class UserChangePasswordDTO {
  readonly userId: string
  readonly previousPassword: string
  readonly newPassword: string
}

export interface UserEmailStatusDTO {
  status: EmailStatus
}
