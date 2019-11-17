import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdEntity } from './ad.entity'
import { AdRepository } from './ad.repository'
import { AdResolver } from './ad.resolver'
import { AdService } from './ad.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([AdEntity])
  ],
  providers: [AdResolver, AdService, AdRepository],
  exports: []
})
export class AdModule {
}
