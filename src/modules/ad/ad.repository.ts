import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, EntityManager, Repository } from 'typeorm'
import { AdEntity } from './ad.entity'

@Injectable()
export class AdRepository {
  constructor(
    @InjectRepository(AdEntity)
    private readonly entity: Repository<AdEntity>
  ) {
  }

  async createOrUpdateOne(entityLike: DeepPartial<AdEntity>, entityManager?: EntityManager): Promise<AdEntity> {
    const entity = this.entity.create(entityLike)
    const result = entityManager ? await entityManager.save(entity) : await this.entity.save(entity)
    return this.entity.findOne(result.id)
  }

}
