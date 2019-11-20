import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../../common/authGuard'
import { CurrentUser } from '../../common/currentUser.decorator'
import { JwtUserPayload } from '../auth/interfaces/jwt.interface'
import { CreateUserInput, UpdateUserInput, User } from './user.graphql'
import { UserService } from './user.service'

@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly service: UserService
  ) {
  }

  @Query(returns => User, { name: 'findUserById' })
  async findOneById(@Args('id') id: string): Promise<User> {
    return this.service.findOneById(id)
  }

  @Query(returns => User, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  async findMe(@CurrentUser() user: JwtUserPayload): Promise<User> {
    return this.service.findOneById(user.id)
  }

  @Mutation(returns => User, { name: 'createUser' })
  async createOne(@Args('user') user: CreateUserInput): Promise<User> {
    return this.service.createOne(user)
  }

  @Mutation(returns => User, { name: 'updateUser' })
  async updateOne(@Args('user') user: UpdateUserInput): Promise<User> {
    return this.service.updateOne(user)
  }

  @Mutation(returns => Boolean, { name: 'removeUser' })
  async removeOne(@Args('id') id: string): Promise<boolean> {
    return this.service.removeOne(id)
  }
}
