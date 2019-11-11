import { ApiModelProperty } from '@nestjs/swagger'
import { UserEntity } from './user.entity'

export class CreateUserRequestDTO {
  @ApiModelProperty()
  readonly firstName: string
  @ApiModelProperty()
  readonly lastName: string
  @ApiModelProperty()
  readonly password: string
  @ApiModelProperty()
  readonly passwordConfirmation: string
  @ApiModelProperty()
  readonly emailAddress: string
  @ApiModelProperty({ required: false })
  readonly photo?: string
}

export class UpdateUserRequestDTO {
  @ApiModelProperty()
  readonly id: string
  @ApiModelProperty({ required: false })
  readonly firstName?: string
  @ApiModelProperty({ required: false })
  readonly lastName?: string
  @ApiModelProperty({ required: false })
  readonly emailAddress?: string
  @ApiModelProperty({ required: false })
  readonly photo?: string
}

export class UserResponseDTO {
  @ApiModelProperty()
  readonly id: string
  @ApiModelProperty()
  readonly firstName: string
  @ApiModelProperty()
  readonly lastName: string
  @ApiModelProperty()
  readonly emailAddress: string
  @ApiModelProperty()
  readonly photo: string | null

  constructor(model: UserEntity) {
    this.id = model.id
    this.firstName = model.firstName
    this.lastName = model.lastName
    this.emailAddress = model.emailAddress
    this.photo = model.photo
  }

  static of(model: UserEntity): UserResponseDTO
  static of(model: UserEntity[]): UserResponseDTO[]

  static of(model: UserEntity | UserEntity[]): UserResponseDTO | UserResponseDTO[] {
    return model instanceof Array ? model.map(it => new UserResponseDTO(it)) : new UserResponseDTO(model)
  }
}

export class UserResponseWithPasswordDto {
  @ApiModelProperty()
  id: string
  @ApiModelProperty()
  firstName: string
  @ApiModelProperty()
  lastName: string
  @ApiModelProperty()
  emailAddress: string
  @ApiModelProperty()
  password: string
  @ApiModelProperty()
  photo: string | null

  constructor(model: UserEntity) {
    this.id = model.id
    this.firstName = model.firstName
    this.lastName = model.lastName
    this.emailAddress = model.emailAddress
    this.photo = model.photo
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
