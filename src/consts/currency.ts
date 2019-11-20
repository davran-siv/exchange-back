import { registerEnumType } from 'type-graphql'

export enum CurrencyType {
  dollar = 'DOLLAR',
  som = 'SOM'
}

registerEnumType(CurrencyType, {
  name: 'CurrencyType',
  description: 'All possible currency'
})
