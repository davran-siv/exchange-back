import { Injectable } from '@nestjs/common'
import { AdCreateFirstStepDTO, AdCreateForthStepDTO, AdCreateSecondStepDTO, AdCreateThirdStepDTO } from './ad.interfaces'

@Injectable()
export class AdService {

  async createAdFirstStep(dto: AdCreateFirstStepDTO): Promise<any> {
    return {}
  }

  async createAdSecondStep(dto: AdCreateSecondStepDTO): Promise<any> {
    return {}
  }

  async createAdThirdStep(dto: AdCreateThirdStepDTO): Promise<any> {
    return {}
  }

  async createAdForthStep(dto: AdCreateForthStepDTO): Promise<any> {
    return {}
  }
}
