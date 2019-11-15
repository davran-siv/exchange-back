import { Args, Query, Resolver } from '@nestjs/graphql'
import { AuthJwtTokes, LoginByCredentialsInput, RefreshTokenInput } from './auth.graphql'
import { AuthService } from './auth.service'

@Resolver(of => AuthJwtTokes)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @Query(returns => AuthJwtTokes, { name: 'loginByCredentials' })
  async loginByCredentials(@Args('auth') auth: LoginByCredentialsInput): Promise<AuthJwtTokes> {
    return this.authService.loginByCredentials(auth)
  }

  @Query(returns => AuthJwtTokes, { name: 'refreshToken' })
  async refreshToken(@Args('auth') auth: RefreshTokenInput): Promise<AuthJwtTokes> {
    return this.authService.refreshToken(auth)
  }
}
