import { Module } from '@nestjs/common';
import { moduleArray } from '@/moduleArray';
import { PrismaService } from '@/prisma.service';
import { ErrorFunction } from '@/error.service';

@Module({
  imports: [...moduleArray],
  controllers: [],
  providers: [PrismaService, ErrorFunction],
})
export class AppModule {}