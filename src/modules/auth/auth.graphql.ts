import { IsNotEmpty, IsString } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'
import { UserQuery } from '../user/user.graphql'

@InputType()
export class AuthLoginByCredentialsQuery {
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
export class AuthRefreshTokenInput {
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

@ObjectType()
export class AuthLoginByCredentialsResponseQuery {
  @Field(type => UserQuery)
  user: UserQuery

  @Field(type => AuthJwtTokesQuery)
  tokens: AuthJwtTokesQuery
}
