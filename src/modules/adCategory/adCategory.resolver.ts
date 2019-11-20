import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AdCategory, AdCategoryCreateInput, AdCategoryUpdateInput } from './adCategory.graphql'
import { AdCategoryService } from './adCategory.service'

@Resolver(of => AdCategory)
export class AdCategoryResolver {
  constructor(
    private readonly service: AdCategoryService
  ) {
  }

  @Query(returns => [AdCategory], { name: 'adCategoryFindAll' })
  findAllParent(): Promise<AdCategory[]> {
    return this.service.findAllParent()
  }

  @Query(returns => AdCategory, { name: 'adCategoryFindOneById' })
  async findOneById(@Args('id') id: string): Promise<AdCategory> {
    return await this.service.findOneById(id)
  }

  @Query(returns => [AdCategory], { name: 'adCategoryFindManyByParentId' })
  findManyByParentId(@Args('id') id: string): Promise<AdCategory[]> {
    return this.service.findManyByParentId(id)
  }

  @Mutation(returns => AdCategory, { name: 'adCategoryCreateOne' })
  createOne(@Args('adCategory') adCategory: AdCategoryCreateInput): Promise<AdCategory> {
    return this.service.createOne(adCategory)
  }

  @Mutation(returns => AdCategory, { name: 'adCategoryUpdateOne' })
  updateOne(@Args('adCategory') adCategory: AdCategoryUpdateInput): Promise<AdCategory> {
    return this.service.updateOne(adCategory)
  }

  @Mutation(returns => Boolean, { name: 'adCategoryRemoveOne' })
  removeOne(@Args('id') id: string): Promise<boolean> {
    return this.service.removeOne(id)
  }
}
