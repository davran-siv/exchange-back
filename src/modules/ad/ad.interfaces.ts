import { AdStatus, AdType, City, CurrencyType } from '../../consts'

export class AdResponseDTO {
  id: string
  category: any
  type: AdType
  title: string
  description: string
  assessedValue: number
  city: City
  phoneNumber: string
  currency: CurrencyType
  status: AdStatus
  interests: any
}

export interface AdCreateFirstStepDTO {
  categoryId: string
}

export interface AdCreateSecondStepDTO {
  id: string
  type: AdType
  title: string
  description?: string
  images?: string[]
}

export interface AdCreateThirdStepDTO {
  id: string
  assessedValue?: number
  currency?: CurrencyType
  city: City
  phoneNumber?: string
}

export interface AdCreateForthStepDTO {
  interestCategoryId: string[]
}
