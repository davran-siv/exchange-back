import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdModule } from './modules/ad/ad.module'
import { AdCategoryModule } from './modules/adCategory/adCategory.module'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot(),
    AdModule,
    AdCategoryModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql'
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
