import { registerEnumType } from 'type-graphql'

export enum EmailStatus {
  FREE = 'FREE',
  EXISTS = 'EXISTS',
  NOT_CONFIRMED = 'NOT_CONFIRMED'
}

registerEnumType(EmailStatus, {
  name: 'EmailStatus',
  description: 'Email statuses'
})
