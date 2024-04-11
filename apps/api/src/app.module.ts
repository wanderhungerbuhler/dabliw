import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreatePersonController } from './controllers/create-person.controller'
import { ListPersonController } from './controllers/list-person.controller'
import { UserController } from './controllers/user.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    CreatePersonController,
    ListPersonController,
    UserController,
    AuthenticateController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
