import { EmailStatus } from '../../consts/email'
import { AuthJwtTokesResponseDTO } from '../auth/interfaces/login.interface'
import { UserEntity } from './user.entity'

export class CreateUserRequestDTO {
  readonly firstName: string
  readonly lastName: string
  readonly password: string
  readonly email: string
  readonly photo?: string
}

export class UpdateUserRequestDTO {
  readonly id: string
  readonly firstName?: string
  readonly lastName?: string
  readonly email?: string
  readonly photo?: string
}

export class UserResponseDTO {
  readonly id: string
  readonly firstName: string
  readonly lastName: string
  readonly email: string
  readonly photo: string | null
  readonly isEmailVerified: boolean
  readonly phoneNumber: string | null
  readonly isPhoneVerified: boolean

  constructor(model: UserEntity) {
    this.id = model.id
    this.firstName = model.firstName
    this.lastName = model.lastName
    this.email = model.email
    this.photo = model.photo
    this.isEmailVerified = model.isEmailVerified
    this.phoneNumber = model.phoneNumber
    this.isPhoneVerified = model.isPhoneVerified
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

export interface UserCreateOneResponseDTO {
  user: UserResponseDTO,
  tokens: AuthJwtTokesResponseDTO
}
