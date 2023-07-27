import { Module } from '@nestjs/common';
import { moduleArray } from './moduleArray';
import { PrismaService } from '@/prisma.service';
import { ErrorFunction } from '@/error.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [...moduleArray],
  controllers: [AppController],
  providers: [PrismaService, ErrorFunction, AppService],
  exports:[PrismaService]
})
export class AppModule {}