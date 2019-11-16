import { IsOptional } from 'class-validator'
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import { AdStatus, AdType, City, CurrencyType } from '../../consts'
import { AdCategory } from '../adCategory/adCategory.graphql'

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

  @Field(type => AdCategory)
  interests: AdCategory[]
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

  @Field(type => Int)
  @IsOptional()
  images?: string[]
}

@InputType()
export class AdCreateThirdStepInput {
  @Field(type => ID)
  id: string

  @Field()
  @IsOptional()
  assessedValue?: number

  @Field(type => CurrencyType)
  @IsOptional()
  currency?: CurrencyType

  @Field(type => City)
  city: City

  @Field()
  @IsOptional()
  phoneNumber?: string
}

@InputType()
export class AdCreateFourthStepInput {
  @Field(type => Int)
  interestCategoryId: string[]
}
