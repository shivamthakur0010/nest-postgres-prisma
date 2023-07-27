import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PrismaService } from '../prisma.service';
import { ErrorFunction } from '../error.service';
@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({})],
  providers: [AuthService, LocalStrategy, JwtStrategy, PrismaService, ErrorFunction],
  exports:[AuthService]
})
export class AuthModule {}
