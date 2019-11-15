import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { UserRepository } from './user.repository'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
    imports: [
      TypeOrmModule.forFeature([UserEntity])
    ],
  controllers: [],
  providers: [UserService, UserRepository, UserResolver],
    exports: [UserModule, UserService]
  }
)
export class UserModule {

}
