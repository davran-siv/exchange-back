import { registerEnumType } from 'type-graphql'

export enum City {
  bishkek = 'bishkek'
}

registerEnumType(City, {
  name: 'City',
  description: 'All possible cities'
})
