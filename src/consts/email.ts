import { registerEnumType } from 'type-graphql'

export enum EmailStatus {
  free = 'FREE',
  exists = 'EXISTS',
  notConfirmed = 'NOT_CONFIRMED'
}

registerEnumType(EmailStatus, {
  name: 'EmailStatus',
  description: 'Email statuses'
})
