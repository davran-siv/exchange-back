import { registerEnumType } from 'type-graphql'

export enum CurrencyType {
  dollar = 'dollar',
  som = 'som'
}

registerEnumType(CurrencyType, {
  name: 'CurrencyType',
  description: 'All possible currency'
})
