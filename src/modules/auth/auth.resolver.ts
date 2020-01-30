import { Args, Query, Resolver } from '@nestjs/graphql'
import { AuthJwtTokesQuery, AuthLoginByCredentialsQuery, AuthLoginByCredentialsResponseQuery, AuthRefreshTokenInput } from './auth.graphql'
import { AuthService } from './auth.service'

@Resolver(of => AuthJwtTokesQuery)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @Query(returns => AuthLoginByCredentialsResponseQuery, { name: 'authLoginByCredentials' })
  async loginByCredentials(@Args('auth') auth: AuthLoginByCredentialsQuery): Promise<AuthLoginByCredentialsResponseQuery> {
    return this.authService.loginByCredentials(auth)
  }

  @Query(returns => AuthJwtTokesQuery, { name: 'authRefreshToken' })
  async refreshToken(@Args('auth') auth: AuthRefreshTokenInput): Promise<AuthJwtTokesQuery> {
    return this.authService.refreshToken(auth)
  }
}
