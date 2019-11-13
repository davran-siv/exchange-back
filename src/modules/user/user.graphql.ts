import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class UserGraphql {
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
