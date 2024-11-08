import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  controllers: [ProductController],
  providers: [PrismaService, ProductService],
})
export class ProductModule {}
