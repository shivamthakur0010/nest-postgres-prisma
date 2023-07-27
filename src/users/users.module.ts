import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { UsersService } from '@/users/users.service';
import { AuthService } from '@/auth/auth.service';
import { UsersController } from '@/users/users.controller';
import { JwtService } from '@nestjs/jwt';
import { ErrorFunction } from '@/error.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [PrismaService, UsersService, AuthService,JwtService, ErrorFunction],
  exports: [UsersService],
})
export class UsersModule {}
