import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forRoot()],
  controllers: [],
  providers: []
})
export class AppModule {
}
