import { Args, Query, Resolver } from '@nestjs/graphql'
import { UserGraphql } from './user.graphql'
import { UserService } from './user.service'

@Resolver(of => UserGraphql)
export class UserResolver {
  constructor(
    private readonly service: UserService
  ) {
  }

  @Query(returns => UserGraphql)
  async user(@Args('id') id: string) {
    return this.service.findOneById(id)
  }

}
