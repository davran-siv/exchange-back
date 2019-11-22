import { Injectable, NotFoundException } from '@nestjs/common'
import { DeepPartial } from 'typeorm'
import { AdStatus } from '../../consts'
import { AdEntity } from './ad.entity'
import {
  AdCreateFirstStepDTO,
  AdCreateForthStepDTO,
  AdCreateSecondStepDTO,
  AdCreateThirdStepDTO,
  AdResponseDTO,
  AdResponseWithFavoriteToUsersDTO,
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

  private updateStatusOne(dto: AdUpdateStatusDTO): Promise<AdResponseDTO> {
    return this.repository.createOrUpdateOne(dto)
  }

  findByIdAndAuthorId(id: string, authorId: string): Promise<AdResponseDTO | undefined> {
    return this.repository.findByIdAndAuthorId(id, authorId)
  }

  findOneById(id: string): Promise<AdResponseDTO | undefined> {
    return this.repository.findOneById(id)
  }

  async createAdFirstStep(dto: AdCreateFirstStepDTO, userId: string): Promise<AdResponseDTO> {
    const entityLike = {
      status: AdStatus.firstStepCreated,
      category: { id: dto.categoryId }
    }
    return await this.repository.createOrUpdateOne(entityLike)
  }

  async createAdSecondStep(dto: AdCreateSecondStepDTO, userId: string): Promise<AdResponseDTO> {
    const entityLike = {
      ...this.createEntityLikeObject(dto),
      status: AdStatus.secondStepCreated
    }
    return this.repository.createOrUpdateOne(entityLike)
  }

  createAdThirdStep(dto: AdCreateThirdStepDTO, userId: string): Promise<AdResponseDTO> {
    return this.repository.createOrUpdateOne(
      {
        status: AdStatus.thirdStepCreated,
        ...dto
      }
    )
  }

  async createAdForthStep(dto: AdCreateForthStepDTO, userId: string): Promise<AdResponseDTO> {
    const entityLike = {
      ...this.createEntityLikeObject(dto),
      status: AdStatus.underConsideration
    }
    return this.repository.createOrUpdateOne(entityLike)
  }

  async updateOne(dto: AdUpdateOneDTO, userId: string): Promise<AdResponseDTO> {
    const entityLike = this.createEntityLikeObject(dto)
    return await this.repository.createOrUpdateOne(entityLike)
  }

  setApprovedStatus(id: string, userId: string): Promise<AdResponseDTO> {
    const entityLike = { id, status: AdStatus.approved }
    return this.updateStatusOne(entityLike)
  }

  setBannedStatus(id: string, userId: string): Promise<AdResponseDTO> {
    const entityLike = { id, status: AdStatus.banned }
    return this.updateStatusOne(entityLike)
  }

  setClosedStatus(id: string, userId: string): Promise<AdResponseDTO> {
    const entityLike = { id, status: AdStatus.closed }
    return this.updateStatusOne(entityLike)
  }

  async removeOne(id: string, userId: string): Promise<boolean> {
    const entityLike = {
      id,
      status: AdStatus.deleted
    }

    return !!await this.repository.createOrUpdateOne(entityLike)
  }

  findManyFavoritesByUserId(userId: string): Promise<AdResponseDTO[]> {
    return this.repository.findManyFavoritesByUserId(userId)
  }

  findOneWithFavoriteToUsers(id: string): Promise<AdResponseWithFavoriteToUsersDTO> {
    return this.repository.findOneWithFavoriteToUsers(id)
  }

  async addToFavoriteByUserId(id: string, userId: string) {
    // TODO Too many requests to the DB. Need ti optimise
    const { favoriteToUsers, ...ad } = await this.findOneWithFavoriteToUsers(id)
    if (!ad) {
      throw new NotFoundException()
    }
    const ads = await this.findManyFavoritesByUserId(userId)
    const isAlreadyAsFavorite = ads.some(it => it.id === id)
    if (isAlreadyAsFavorite) {
      return ads
    }

    const entityLike = {
      id,
      favoriteToUsers: [...favoriteToUsers, { id: userId }]
    }

    await this.repository.createOrUpdateOne(entityLike)
    return [...ads, ad]
  }

  async removeFromFavoriteByUserId(id: string, userId: string) {
    // TODO Too many requests to the DB. Need ti optimise
    const { favoriteToUsers, ...ad } = await this.findOneWithFavoriteToUsers(id)

    if (!ad) {
      throw new NotFoundException()
    }
    const ads = await this.findManyFavoritesByUserId(userId)
    const isAlreadyAsFavorite = ads.some(it => it.id === id)
    if (!isAlreadyAsFavorite) {
      return ads
    }

    const entityLike = {
      id,
      favoriteToUsers: favoriteToUsers.filter(it => it.id !== userId)
    }

    await this.repository.createOrUpdateOne(entityLike)
    return ads.filter(it => it.id !== id)
  }
}
