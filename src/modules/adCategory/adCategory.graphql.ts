import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class AdCategory {
  @Field(type => ID)
  id: string

  @Field()
  name: string
}
