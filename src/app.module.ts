import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdController } from './modules/ad/ad.controller'
import { AdModule } from './modules/ad/ad.module'
import { AdService } from './modules/ad/ad.service'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot(),
    AdModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql'
    })
  ],
  controllers: [AdController],
  providers: [AdService]
})
export class AppModule {
}
