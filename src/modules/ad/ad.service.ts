import { Injectable } from '@nestjs/common'
import { AdCreateFirstStepDTO, AdCreateForthStepDTO, AdCreateSecondStepDTO, AdCreateThirdStepDTO } from './ad.interfaces'
import { AdRepository } from './ad.repository'

@Injectable()
export class AdService {

  constructor(
    private readonly repository: AdRepository
  ) {
  }

  async createAdFirstStep(dto: AdCreateFirstStepDTO): Promise<any> {
    const entityLike = { category: { id: dto.categoryId } }
    return await this.repository.createOrUpdateOne(entityLike)
  }

  async createAdSecondStep(dto: AdCreateSecondStepDTO): Promise<any> {
    return {}
  }

  async createAdThirdStep(dto: AdCreateThirdStepDTO): Promise<any> {
    return {}
  }

  async createAdForthStep(dto: AdCreateForthStepDTO): Promise<any> {
    return {}
  }
}
