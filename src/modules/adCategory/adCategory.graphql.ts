import { Field, ID, InputType, ObjectType } from 'type-graphql'

@ObjectType()
export class AdCategory {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field(type => AdCategory, { nullable: true })
  parent?: AdCategory
}

@InputType()
export class AdCategoryCreateInput {
  @Field()
  name: string

  @Field({ nullable: true })
  parentId?: string
}

@InputType()
export class AdCategoryUpdateInput {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  parentId?: string
}
