import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../../common/authGuard'
import { CurrentUser } from '../../common/currentUser.decorator'
import { JwtUserPayload } from '../auth/interfaces/jwt.interface'
import { User, UserChangePasswordInput, UserCreateInput, UserUpdateInput } from './user.graphql'
import { UserService } from './user.service'

@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly service: UserService
  ) {
  }

  @Query(returns => User, { name: 'userFindById' })
  async findOneById(@Args('id') id: string): Promise<User> {
    return this.service.findOneById(id)
  }

  @Query(returns => User, { name: 'userMe' })
  @UseGuards(GqlAuthGuard)
  async findMe(@CurrentUser() userPayload: JwtUserPayload): Promise<User> {
    return this.service.findOneById(userPayload.id)
  }

  @Mutation(returns => User, { name: 'userCreate' })
  async createOne(@Args('user') user: UserCreateInput): Promise<User> {
    return this.service.createOne(user)
  }

  @Mutation(returns => User, { name: 'userUpdate' })
  async updateOne(@Args('user') user: UserUpdateInput): Promise<User> {
    return this.service.updateOne(user)
  }

  @Mutation(returns => User, { name: 'userChangePassword' })
  @UseGuards(GqlAuthGuard)
  async changePassword(
    @Args('passwords') passwords: UserChangePasswordInput,
    @CurrentUser() userPayload: JwtUserPayload
  ): Promise<User> {
    return this.service.changePassword({ userId: userPayload.id, ...passwords })
  }

  @Mutation(returns => Boolean, { name: 'removeUser' })
  async removeOne(@Args('id') id: string): Promise<boolean> {
    return this.service.removeOne(id)
  }
}
