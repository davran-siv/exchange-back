import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Image {
  @Field(type => ID)
  id: string

  @Field()
  path: string
}
