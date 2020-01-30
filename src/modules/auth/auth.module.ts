import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import * as c from 'config'
import { UserModule } from '../user/user.module'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' })

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: c.get('jwtToken.secretKey')
    }),
    UserModule
  ],
  controllers: [],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [passportModule, AuthModule, AuthService]
})
export class AuthModule {
}
