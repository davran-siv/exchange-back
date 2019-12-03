import { ApiModelProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginByCredentialsDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  email: string

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

export interface AuthJwtTokesResponseDTO {
  accessToken: string
  refreshToken: string
}
