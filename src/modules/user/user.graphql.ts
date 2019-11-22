import { IsEmail, IsOptional, Length } from 'class-validator'
import { Field, ID, InputType, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field(type => ID)
  id: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  emailAddress: string

  @Field({ nullable: true })
  photo?: string
}

@InputType()
export class UserCreateInput {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  @IsEmail()
  emailAddress: string

  @Field()
  @Length(4, 16)
  password: string

  @Field({ nullable: true })
  @IsOptional()
  photo?: string
}

@InputType()
export class UserUpdateInput {
  @Field(type => ID)
  id: string

  @Field({ nullable: true })
  firstName: string

  @Field({ nullable: true })
  lastName: string

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  emailAddress: string

  @Field({ nullable: true })
  @IsOptional()
  photo?: string
}

@InputType()
export class UserChangePasswordInput {
  @Field()
  previousPassword: string

  @Field()
  newPassword: string
}
