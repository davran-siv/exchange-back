import { Injectable } from '@nestjs/common'
import { DeepPartial } from 'typeorm'
import { AdStatus } from '../../consts'
import { AdEntity } from './ad.entity'
import {
  AdCreateFirstStepDTO,
  AdCreateForthStepDTO,
  AdCreateSecondStepDTO,
  AdCreateThirdStepDTO,
  AdResponseDTO,
  AdUpdateOneDTO,
  AdUpdateStatusDTO
} from './ad.interfaces'
import { AdRepository } from './ad.repository'

@Injectable()
export class AdService {

  constructor(
    private readonly repository: AdRepository
  ) {
  }

  private createEntityLikeObject(dto: AdUpdateOneDTO): DeepPartial<AdEntity> {
    const { categoryId, interestCategoryIds, imageIds, ...restDTO } = dto
    return {
      ...restDTO,
      category: categoryId && { id: categoryId },
      interests: interestCategoryIds && interestCategoryIds.map(id => ({ id })),
      images: imageIds && imageIds.map(id => ({ id }))
    }

  }

  findOneById(id: string): Promise<AdResponseDTO> {
    return this.repository.findOneById(id)
  }

  async createAdFirstStep(dto: AdCreateFirstStepDTO): Promise<AdResponseDTO> {
    const entityLike = {
      status: AdStatus.firstStepCreated,
      category: { id: dto.categoryId }
    }
    return this.repository.createOrUpdateOne(entityLike)
  }

  async createAdSecondStep(dto: AdCreateSecondStepDTO): Promise<AdResponseDTO> {
    const entityLike = {
      ...this.createEntityLikeObject(dto),
      status: AdStatus.secondStepCreated
    }
    return this.repository.createOrUpdateOne(entityLike)
  }

  createAdThirdStep(dto: AdCreateThirdStepDTO): Promise<AdResponseDTO> {
    return this.repository.createOrUpdateOne(
      {
        status: AdStatus.thirdStepCreated,
        ...dto
      }
    )
  }

  async createAdForthStep(dto: AdCreateForthStepDTO): Promise<AdResponseDTO> {
    const entityLike = {
      ...this.createEntityLikeObject(dto),
      status: AdStatus.underConsideration
    }
    return this.repository.createOrUpdateOne(entityLike)
  }

  async removeOne(id: string): Promise<boolean> {
    const entityLike = {
      id,
      status: AdStatus.deleted
    }

    return !!await this.repository.createOrUpdateOne(entityLike)
  }

  async updateStatusOne(dto: AdUpdateStatusDTO): Promise<AdResponseDTO> {
    return await this.repository.createOrUpdateOne(dto)
  }

  async updateOne(dto: AdUpdateOneDTO): Promise<AdResponseDTO> {
    const entityLike = this.createEntityLikeObject(dto)
    return await this.repository.createOrUpdateOne(entityLike)
  }
}
