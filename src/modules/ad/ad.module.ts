import { Module } from '@nestjs/common'
import { AdResolver } from './ad.resolver'

@Module({
  providers: [AdResolver],
  exports: [AdModule]
})
export class AdModule {
}
