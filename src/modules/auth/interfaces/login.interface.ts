import { ApiModelProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginByCredentialsDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  emailAddress: string

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  password: string
}

export class RefreshTokenDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken: string
}
