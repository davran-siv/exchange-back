import { Injectable } from '@nestjs/common'
import { AdCategoryCreateDTO, AdCategoryEntityLikeDTO, AdCategoryResponseDTO, AdCategoryUpdateDTO } from './adCategory.interfaces'
import { AdCategoryRepository } from './adCategory.repository'

@Injectable()
export class AdCategoryService {
  constructor(
    private readonly repository: AdCategoryRepository
  ) {
  }

  private async createEntityLike(dto: AdCategoryEntityLikeDTO) {
    const { parentId, ...restDTO } = dto
    return {
      ...restDTO,
      parent: parentId && { id: parentId }
    }
  }

  findAllParent(): Promise<AdCategoryResponseDTO[]> {
    return this.repository.findAllParent()
  }

  findOneById(id: string): Promise<AdCategoryResponseDTO> {
    return this.repository.findOneById(id)
  }

  findManyByParentId(id: string): Promise<AdCategoryResponseDTO[]> {
    return this.repository.findManyByParentId(id)
  }

  async createOne(dto: AdCategoryCreateDTO): Promise<AdCategoryResponseDTO> {
    const entityLike = await this.createEntityLike(dto)
    return await this.repository.createOrUpdateOne(entityLike)
  }

  async updateOne(dto: AdCategoryUpdateDTO): Promise<AdCategoryResponseDTO> {
    const entityLike = await this.createEntityLike(dto)
    return this.repository.createOrUpdateOne(entityLike)
  }

  async removeOne(id: string): Promise<boolean> {
    return !!await this.repository.removeOne(id)
  }
}
