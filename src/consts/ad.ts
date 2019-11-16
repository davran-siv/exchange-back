import { registerEnumType } from 'type-graphql'

export enum AdStatus {
  approved = 'approved',
  banned = 'banned',
  underConsideration = 'underConsideration',
  deleted = 'deleted',
  closed = 'closed',
  notFullFilled = 'notFullFilled'
}

export enum AdType {
  service = 'service',
  product = 'product'
}

registerEnumType(AdStatus, {
  name: 'AdStatus',
  description: 'Ad statuses'
})

registerEnumType(AdType, {
  name: 'AdType',
  description: 'Ad types'
})
