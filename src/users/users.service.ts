import { Injectable } from '@nestjs/common';
import { ErrorFunction } from 'src/error.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService, private readonly errorFunction:ErrorFunction) {}

  async findUserByEmail(email: string) {
    try {
      return this.prisma.user.findUnique({ where: { email } });
    } catch (error) {
      throw this.errorFunction.RelationError(error)
    }
  }

  async getAllUsers() {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      throw this.errorFunction.RelationError(error)
    }
  }
  async meData(userData) {
    try {
      const data = await this.prisma.user.findUnique({
        where: {
          id: userData.id,
        },
        include: {
          Profile: true,
        },
      });
      const { password, ...result } = data;
      return result;
    } catch (error) {
      throw this.errorFunction.RelationError(error)
    }
  }
}
