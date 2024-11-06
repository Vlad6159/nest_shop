import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [PrismaService, ProductService],
})
export class ProductController {}
