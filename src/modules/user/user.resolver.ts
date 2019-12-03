import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../../common/authGuard'
import { CurrentUser } from '../../common/currentUser.decorator'
import { JwtUserPayload } from '../auth/interfaces/jwt.interface'
import { UserChangePasswordInput, UserCreateInput, UserCreateResponseQuery, UserEmailStatusQuery, UserQuery, UserUpdateInput } from './user.graphql'
import { UserService } from './user.service'

@Resolver(of => UserQuery)
export class UserResolver {
  constructor(
    private readonly service: UserService
  ) {
  }

  @Query(returns => UserQuery, { name: 'userFindById' })
  async findOneById(@Args('id') id: string): Promise<UserQuery> {
    return this.service.findOneById(id)
  }

  @Query(returns => UserQuery, { name: 'userMe' })
  @UseGuards(GqlAuthGuard)
  async findMe(@CurrentUser() userPayload: JwtUserPayload): Promise<UserQuery> {
    return this.service.findOneById(userPayload.id)
  }

  @Mutation(returns => UserCreateResponseQuery, { name: 'userCreate' })
  async createOne(@Args('user') user: UserCreateInput): Promise<UserCreateResponseQuery> {
    return this.service.createOne(user)
  }

  @Mutation(returns => UserQuery, { name: 'userUpdate' })
  async updateOne(@Args('user') user: UserUpdateInput): Promise<UserQuery> {
    return this.service.updateOne(user)
  }

  @Mutation(returns => UserQuery, { name: 'userChangePassword' })
  @UseGuards(GqlAuthGuard)
  async changePassword(
    @Args('passwords') passwords: UserChangePasswordInput,
    @CurrentUser() userPayload: JwtUserPayload
  ): Promise<UserQuery> {
    return this.service.changePassword({ userId: userPayload.id, ...passwords })
  }

  @Mutation(returns => Boolean, { name: 'userRemove' })
  async removeOne(@Args('id') id: string): Promise<boolean> {
    return this.service.removeOne(id)
  }

  @Query(returns => UserEmailStatusQuery, { name: 'userGetEmailStatus' })
  getEmailStatus(@Args('email') email: string): Promise<UserEmailStatusQuery> {
    return this.service.getEmailStatus(email)
  }
}
