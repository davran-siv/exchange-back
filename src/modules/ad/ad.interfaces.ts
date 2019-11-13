import { ApiModelProperty } from '@nestjs/swagger'
import { AdStatus, AdType, City, CurrencyType } from '../../consts'

export class AdResponseDTO {
  @ApiModelProperty()
  id: string
  @ApiModelProperty()
  category: any
  @ApiModelProperty()
  type: AdType
  @ApiModelProperty()
  title: string
  @ApiModelProperty()
  description: string
  @ApiModelProperty()
  assessedValue: number
  @ApiModelProperty()
  city: City
  @ApiModelProperty()
  phoneNumber: string
  @ApiModelProperty()
  currency: CurrencyType
  @ApiModelProperty()
  status: AdStatus
  @ApiModelProperty()
  interests: any
}
