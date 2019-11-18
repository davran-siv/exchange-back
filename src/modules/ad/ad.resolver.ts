import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Ad, AdCreateFirstStepInput, AdCreateFourthStepInput, AdCreateSecondStepInput, AdCreateThirdStepInput, AdUpdateOneInput } from './ad.graphql'
import { AdService } from './ad.service'

@Resolver(of => Ad)
export class AdResolver {
  constructor(
    private readonly service: AdService
  ) {
  }

  @Query(returns => Ad, { name: 'ad' })
  findOneById(@Args('id') id: string): Promise<Ad> {
    return this.service.findOneById(id)
  }

  @Mutation(returns => Ad, { name: 'adCreatFirstStep' })
  creatAdFirstStep(@Args('ad') ad: AdCreateFirstStepInput): Promise<Ad> {
    return this.service.createAdFirstStep(ad)
  }

  @Mutation(returns => Ad, { name: 'adCreatSecondStep' })
  creatAdSecondStep(@Args('ad') ad: AdCreateSecondStepInput): Promise<Ad> {
    return this.service.createAdSecondStep(ad)
  }

  @Mutation(returns => Ad, { name: 'adCreatThirdStep' })
  creatAdThirdStep(@Args('ad') ad: AdCreateThirdStepInput): Promise<Ad> {
    return this.service.createAdThirdStep(ad)
  }

  @Mutation(returns => Ad, { name: 'adCreatForthStep' })
  creatAdForthStep(@Args('ad') ad: AdCreateFourthStepInput): Promise<Ad> {
    return this.service.createAdForthStep(ad)
  }

  @Mutation(returns => Ad, { name: 'adUpdateOne' })
  updateOne(@Args('ad') ad: AdUpdateOneInput): Promise<Ad> {
    return this.service.updateOne(ad)
  }

  @Mutation(returns => Ad, { name: 'adSetApprovedStatus' })
  setApprovedStatus(@Args('id') id: string): Promise<Ad> {
    return this.service.setApprovedStatus(id)
  }

  @Mutation(returns => Ad, { name: 'adSetBannedStatus' })
  setBannedStatus(@Args('id') id: string): Promise<Ad> {
    return this.service.setBannedStatus(id)
  }

  @Mutation(returns => Ad, { name: 'adSetClosedStatus' })
  setClosedStatus(@Args('id') id: string): Promise<Ad> {
    return this.service.setClosedStatus(id)
  }

  @Mutation(returns => Boolean, { name: 'adRemoveOne' })
  removeOne(@Args('id') id: string): Promise<boolean> {
    return this.service.removeOne(id)
  }
}
