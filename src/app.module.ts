import { Module } from '@nestjs/common';
import { moduleArray } from './moduleArray';
import { PrismaService } from './prisma.service';

@Module({
  imports: [...moduleArray],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
