import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from '../user/user.service';
import { RefreshTokensService } from './refresh-tokens.service';

@Module({
  imports: [UsersModule , PrismaModule],
  providers: [AuthService, UserService, RefreshTokensService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}

