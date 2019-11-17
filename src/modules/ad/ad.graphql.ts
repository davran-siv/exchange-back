import { IsOptional } from 'class-validator'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { AdStatus, AdType, City, CurrencyType } from '../../consts'
import { AdCategory } from '../adCategory/adCategory.graphql'
import { Image } from '../image/image.graphql'

@ObjectType()
export class Ad {
  @Field(type => ID)
  id: string

  @Field()
  title: string

  @Field()
  description: string

  @Field()
  assessedValue: number

  @Field()
  phoneNumber: string

  @Field(type => CurrencyType)
  currency: CurrencyType

  @Field(type => AdType)
  type: AdType

  @Field(type => City)
  city: City

  @Field(type => AdStatus)
  status: AdStatus

  @Field(type => AdCategory)
  category: AdCategory

  @Field(type => [AdCategory])
  interests: AdCategory[]

  @Field(type => [Image])
  images: Image[]
}

@InputType()
export class AdCreateFirstStepInput {
  @Field()
  categoryId: string
}

@InputType()
export class AdCreateSecondStepInput {
  @Field(type => ID)
  id: string

  @Field(type => AdType)
  type: AdType

  @Field()
  title: string

  @Field()
  @IsOptional()
  description?: string

  @Field(type => [String], { nullable: true })
  @IsOptional()
  images?: string[]
}

@InputType()
export class AdCreateThirdStepInput {
  @Field(type => ID)
  id: string

  @Field({ nullable: true })
  @IsOptional()
  assessedValue?: number

  @Field(type => CurrencyType, { nullable: true })
  @IsOptional()
  currency?: CurrencyType

  @Field(type => City)
  city: City

  @Field({ nullable: true })
  @IsOptional()
  phoneNumber?: string
}

@InputType()
export class AdCreateFourthStepInput {
  @Field(type => ID)
  id: string

  @Field(type => [String])
  interestCategoryIds: string[]
}

@InputType()
export class AdUpdateOneInput {
  @Field(type => ID)
  id: string

  @Field({ nullable: true })
  title: string

  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  assessedValue: number

  @Field({ nullable: true })
  phoneNumber: string

  @Field(type => CurrencyType, { nullable: true })
  currency: CurrencyType

  @Field(type => AdType, { nullable: true })
  type: AdType

  @Field(type => City, { nullable: true })
  city: City

  @Field(type => AdStatus, { nullable: true })
  status: AdStatus

  @Field(type => [String], { nullable: true })
  categoryId: string

  @Field(type => [String], { nullable: true })
  interestCategoryIds: string[]

  @Field(type => [String], { nullable: true })
  imageIds: string[]
}
