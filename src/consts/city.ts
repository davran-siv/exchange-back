import { registerEnumType } from 'type-graphql'

export enum City {
  bishkek = 'BISHKEK'
}

registerEnumType(City, {
  name: 'City',
  description: 'All possible cities'
})
