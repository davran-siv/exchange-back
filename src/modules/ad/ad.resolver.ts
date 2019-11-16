import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AdType, City, CurrencyType } from '../../consts'
import { Ad, AdCreateFirstStepInput, AdCreateFourthStepInput, AdCreateSecondStepInput, AdCreateThirdStepInput } from './ad.graphql'
import { AdService } from './ad.service'

const category = { id: '2387329e-87d4-4fe4-88d7-6ae2e3d2ffd1', name: 'category name' }

const firstStepMock = {
  id: '2387329e-87d4-4fe4-88d7-6ae2e3d2ffd0',
  category
}

const secondStemMock = {
  ...firstStepMock,
  type: AdType.service,
  title: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising',
  description: 'pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness'
}

const thirdStepMock = {
  ...secondStemMock,
  assessedValue: '5000',
  currency: CurrencyType.dollar,
  city: City.bishkek,
  phoneNumber: '+996702188575'
}

const forthStepMock = {
  ...thirdStepMock,
  interests: [category, category]
}

@Resolver(of => Ad)
export class AdResolver {
  constructor(
    private readonly service: AdService
  ) {
  }

  @Mutation(returns => Ad, { name: 'creatAdFirstStep' })
  async creatAdFirstStep(@Args('ad') ad: AdCreateFirstStepInput): Promise<Ad> {
    return this.service.createAdFirstStep(ad)
  }

  @Mutation(returns => Ad, { name: 'creatAdSecondStep' })
  async creatAdSecondStep(@Args('ad') ad: AdCreateSecondStepInput): Promise<Ad> {
    return this.service.createAdSecondStep(ad)
  }

  @Mutation(returns => Ad, { name: 'creatAdThirdStep' })
  async creatAdThirdStep(@Args('ad') ad: AdCreateThirdStepInput): Promise<Ad> {
    return this.service.createAdThirdStep(ad)
  }

  @Mutation(returns => Ad, { name: 'creatAdForthStep' })
  async creatAdForthStep(@Args('ad') ad: AdCreateFourthStepInput): Promise<Ad> {
    return this.service.createAdForthStep(ad)
  }
}
