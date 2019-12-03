import { IsNotEmpty, IsString } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'

@InputType()
export class LoginByCredentialsInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  email: string

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string
}

@InputType()
export class RefreshTokenInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  refreshToken: string
}

@ObjectType()
export class AuthJwtTokesQuery {
  @Field()
  accessToken: string

  @Field()
  refreshToken: string
}
