import { NotFoundException, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../../common/authGuard'
import { CurrentUser } from '../../common/currentUser.decorator'
import { JwtUserPayload } from '../auth/interfaces/jwt.interface'
import { Ad, AdCreateFirstStepInput, AdCreateFourthStepInput, AdCreateSecondStepInput, AdCreateThirdStepInput, AdUpdateOneInput } from './ad.graphql'
import { AdService } from './ad.service'

@Resolver(of => Ad)
export class AdResolver {
  constructor(
    private readonly service: AdService
  ) {
  }

  @Query(returns => Ad, { name: 'ad' })
  async findOneById(@Args('id') id: string): Promise<Ad> {
    const ad = await this.service.findOneById(id)
    if (!ad) {
      throw new NotFoundException()
    }
    return ad
  }

  @Mutation(returns => Ad, { name: 'adCreateFirstStep' })
  @UseGuards(GqlAuthGuard)
  createAdFirstStep(@Args('ad') ad: AdCreateFirstStepInput, @CurrentUser() userPayload: JwtUserPayload): Promise<Ad> {
    return this.service.createAdFirstStep(ad, userPayload.id)
  }

  @Mutation(returns => Ad, { name: 'adCreateSecondStep' })
  @UseGuards(GqlAuthGuard)
  createAdSecondStep(@Args('ad') ad: AdCreateSecondStepInput, @CurrentUser() userPayload: JwtUserPayload): Promise<Ad> {
    return this.service.createAdSecondStep(ad, userPayload.id)
  }

  @Mutation(returns => Ad, { name: 'adCreateThirdStep' })
  @UseGuards(GqlAuthGuard)
  createAdThirdStep(@Args('ad') ad: AdCreateThirdStepInput, @CurrentUser() userPayload: JwtUserPayload): Promise<Ad> {
    return this.service.createAdThirdStep(ad, userPayload.id)
  }

  @Mutation(returns => Ad, { name: 'adCreateForthStep' })
  @UseGuards(GqlAuthGuard)
  createAdForthStep(@Args('ad') ad: AdCreateFourthStepInput, @CurrentUser() userPayload: JwtUserPayload): Promise<Ad> {
    return this.service.createAdForthStep(ad, userPayload.id)
  }

  @Mutation(returns => Ad, { name: 'adUpdateOne' })
  @UseGuards(GqlAuthGuard)
  updateOne(@Args('ad') ad: AdUpdateOneInput, @CurrentUser() userPayload: JwtUserPayload): Promise<Ad> {
    return this.service.updateOne(ad, userPayload.id)
  }

  @Mutation(returns => Ad, { name: 'adSetApprovedStatus' })
  @UseGuards(GqlAuthGuard)
  setApprovedStatus(@Args('id') id: string, @CurrentUser() userPayload: JwtUserPayload): Promise<Ad> {
    return this.service.setApprovedStatus(id, userPayload.id)
  }

  @Mutation(returns => Ad, { name: 'adSetBannedStatus' })
  @UseGuards(GqlAuthGuard)
  setBannedStatus(@Args('id') id: string, @CurrentUser() userPayload: JwtUserPayload): Promise<Ad> {
    return this.service.setBannedStatus(id, userPayload.id)
  }

  @Mutation(returns => Ad, { name: 'adSetClosedStatus' })
  @UseGuards(GqlAuthGuard)
  setClosedStatus(@Args('id') id: string, @CurrentUser() userPayload: JwtUserPayload): Promise<Ad> {
    return this.service.setClosedStatus(id, userPayload.id)
  }

  @Mutation(returns => [Ad], { name: 'adAddToFavorite' })
  @UseGuards(GqlAuthGuard)
  addToFavoriteByUserId(@Args('id') id: string, @CurrentUser() userPayload: JwtUserPayload): Promise<Ad[]> {
    return this.service.addToFavoriteByUserId(id, userPayload.id)
  }

  @Mutation(returns => [Ad], { name: 'adRemoveFromFavorite' })
  @UseGuards(GqlAuthGuard)
  removeFromFavoriteByUserId(@Args('id') id: string, @CurrentUser() userPayload: JwtUserPayload): Promise<Ad[]> {
    return this.service.removeFromFavoriteByUserId(id, userPayload.id)
  }

  @Mutation(returns => Boolean, { name: 'adRemoveOne' })
  @UseGuards(GqlAuthGuard)
  removeOne(@Args('id') id: string, @CurrentUser() userPayload: JwtUserPayload): Promise<boolean> {
    return this.service.removeOne(id, userPayload.id)
  }
}
