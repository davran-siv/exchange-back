import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, DeleteResult, EntityManager, Repository, TreeRepository } from 'typeorm'
import { AdCategoryEntity } from './adCategory.entity'

@Injectable()
export class AdCategoryRepository {
  constructor(
    @InjectRepository(AdCategoryEntity)
    private readonly entity: Repository<AdCategoryEntity>,
    @InjectRepository(AdCategoryEntity)
    private readonly tree: TreeRepository<AdCategoryEntity>
  ) {
  }

  async findOneById(id: string): Promise<AdCategoryEntity> {
    const entity = await this.entity.findOne(id)

    return this.tree.findAncestorsTree(entity)
    // return this.tree
    //            .createAncestorsQueryBuilder('adCategory', 'categoryClosure', entity)
    //            .getMany()
  }

  async createOrUpdateOne(entityLike: DeepPartial<AdCategoryEntity>, entityManager?: EntityManager): Promise<AdCategoryEntity> {
    const entity = this.entity.create(entityLike)
    return entityManager ? await entityManager.save(entity) : await this.entity.save(entity)
  }

  findAllParent(): Promise<AdCategoryEntity[]> {
    return this.tree.findRoots()
  }

  findManyByParentId(id: string): Promise<AdCategoryEntity[]> {
    return this.entity
               .createQueryBuilder('adCategory')
               .where('adCategory.parent_category_id = :id', { id })
               .getMany()
  }

  removeOne(id: string): Promise<DeleteResult> {
    return this.entity
               .createQueryBuilder()
               .delete()
               .from(AdCategoryEntity)
               .where('id = :id', { id: 1 })
               .execute()
  }

}
