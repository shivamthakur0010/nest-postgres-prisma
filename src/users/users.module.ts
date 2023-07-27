import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { ErrorFunction } from 'src/error.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [PrismaService, UsersService, AuthService,JwtService, ErrorFunction],
  exports: [UsersService],
})
export class UsersModule {}
