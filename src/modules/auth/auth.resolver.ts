import { Args, Query, Resolver } from '@nestjs/graphql'
import { AuthJwtTokesQuery, LoginByCredentialsInput, RefreshTokenInput } from './auth.graphql'
import { AuthService } from './auth.service'

@Resolver(of => AuthJwtTokesQuery)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @Query(returns => AuthJwtTokesQuery, { name: 'loginByCredentials' })
  async loginByCredentials(@Args('auth') auth: LoginByCredentialsInput): Promise<AuthJwtTokesQuery> {
    return this.authService.loginByCredentials(auth)
  }

  @Query(returns => AuthJwtTokesQuery, { name: 'refreshToken' })
  async refreshToken(@Args('auth') auth: RefreshTokenInput): Promise<AuthJwtTokesQuery> {
    return this.authService.refreshToken(auth)
  }
}
