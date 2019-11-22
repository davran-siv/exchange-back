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

  findOneById(id: string): Promise<AdEntity | undefined> {
    return this.entity.findOne(id)
  }

  async createOrUpdateOne(entityLike: DeepPartial<AdEntity>, entityManager?: EntityManager): Promise<AdEntity> {
    const entity = this.entity.create(entityLike)
    const result = entityManager ? await entityManager.save(entity) : await this.entity.save(entity)
    return this.entity.findOne(result.id)
  }

  async findByIdAndAuthorId(id: string, authorId: string): Promise<AdEntity | undefined> {
    return this.entity.createQueryBuilder('ad')
               .leftJoin('ad.author', 'author')
               .where('ad.id = :id', { id })
               .andWhere('author.id = :authorId', { authorId })
               .getOne()
  }

  findManyFavoritesByUserId(userId: string): Promise<AdEntity[]> {
    return this.entity.createQueryBuilder('ad')
               .leftJoin('ad.favoriteToUsers', 'favoriteToUsers')
               .where('favoriteToUsers.id = :userId', { userId })
               .getMany()
  }

  findOneWithFavoriteToUsers(id: string): Promise<AdEntity> {
    return this.entity.createQueryBuilder('ad')
               .leftJoinAndSelect('ad.favoriteToUsers', 'favoriteToUsers')
               .where('ad.id = :id', { id })
               .getOne()
  }

}
