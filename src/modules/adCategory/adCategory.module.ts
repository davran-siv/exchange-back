import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdCategoryEntity } from './adCategory.entity'
import { AdCategoryRepository } from './adCategory.repository'
import { AdCategoryResolver } from './adCategory.resolver'
import { AdCategoryService } from './adCategory.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([AdCategoryEntity])
  ],
  providers: [AdCategoryResolver, AdCategoryService, AdCategoryRepository],
  exports: []
})
export class AdCategoryModule {
}
