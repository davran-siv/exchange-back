import { Resolver } from '@nestjs/graphql'
import { AdCategory } from './adCategory.graphql'
import { AdCategoryService } from './adCategory.service'

@Resolver(of => AdCategory)
export class AdCategoryResolver {
  constructor(
    private readonly service: AdCategoryService
  ) {
    const
      }
}
