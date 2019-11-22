import { AdStatus, AdType, City, CurrencyType } from '../../consts'
import { AdCategoryResponseDTO } from '../adCategory/adCategory.interfaces'
import { ImageResponseDTO } from '../image/image.interfaces'
import { UserResponseDTO } from '../user/user.interfaces'

export class AdResponseDTO {
  id: string
  category: AdCategoryResponseDTO
  type: AdType
  title: string
  description: string
  assessedValue: number
  city: City
  phoneNumber: string
  currency: CurrencyType
  status: AdStatus
  interests: AdCategoryResponseDTO[]
  images: ImageResponseDTO[]
}

export interface AdCreateFirstStepDTO {
  categoryId: string
}

export interface AdCreateSecondStepDTO {
  id: string
  type: AdType
  title: string
  description?: string
  imageIds?: string[]
}

export interface AdCreateThirdStepDTO {
  id: string
  assessedValue?: number
  currency?: CurrencyType
  city: City
  phoneNumber?: string
}

export interface AdCreateForthStepDTO {
  id: string
  interestCategoryIds: string[]
}

export interface AdUpdateStatusDTO {
  id: string,
  status: AdStatus
}

export interface AdUpdateOneDTO {
  id: string
  categoryId?: string
  type?: AdType
  title?: string
  description?: string
  assessedValue?: number
  city?: City
  phoneNumber?: string
  currency?: CurrencyType
  status?: AdStatus
  interestCategoryIds?: string[]
  imageIds?: string[]
}

export interface AdResponseWithFavoriteToUsersDTO extends AdResponseDTO {
  favoriteToUsers: UserResponseDTO[]
}
