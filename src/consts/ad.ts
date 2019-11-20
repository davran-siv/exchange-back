import { registerEnumType } from 'type-graphql'

export enum AdStatus {
  approved = 'APPROVED',
  banned = 'BANNED',
  underConsideration = 'UNDER_CONSIDERATION',
  deleted = 'DELETED',
  closed = 'CLOSED',
  firstStepCreated = 'FIRST_STEP_CREATED',
  secondStepCreated = 'SECOND_STEP_CREATED',
  thirdStepCreated = 'THIRD_STEP_CREATED',
}

export enum AdType {
  service = 'SERVICE',
  product = 'PRODUCT'
}

registerEnumType(AdStatus, {
  name: 'AdStatus',
  description: 'Ad statuses'
})

registerEnumType(AdType, {
  name: 'AdType',
  description: 'Ad types'
})
