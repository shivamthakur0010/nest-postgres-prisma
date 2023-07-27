import { Injectable } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/prisma.service';
import { jwtConstants } from '@/auth/constants';
import { ErrorFunction } from '@/error.service';
// import { REQUEST } from '@nestjs/core';
// import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly errorFunction:ErrorFunction
  ) // @Inject(REQUEST) private req: Request
  {}

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findUserByEmail(email);
      const verifyPassword = await bcrypt.compare(pass, user.password);
      if (user && verifyPassword) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      throw this.errorFunction.RelationError(error);
    }
  }

  async login(payload: any) {
    try {
      // const payload = await this.prisma.user.findUnique({where:{email:user?.email},select:{
      //   email:true,
      //   name:true,
      //   id:true,
      // }});
      const access_token = this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
        expiresIn: '360000s',
      });
      return access_token;
    } catch (error) {
      throw this.errorFunction.RelationError(error);
    }
  }
  async signup(userData: any) {
    try {
      const hashedPassword = await bcrypt.hash(
        userData.password,
        await bcrypt.genSalt(),
      );
      const user = await this.prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });
      if (!user) {
        return null;
      }
      return this.login(user);
    } catch (error) {
      throw this.errorFunction.RelationError(error);
    }
  }
}
