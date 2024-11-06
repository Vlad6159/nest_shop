import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ProductDto } from 'src/dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async createProduct(product: ProductDto): Promise<void> {
    try {
      await this.prisma.product.create({ data: product });
    } catch (e) {
      throw e;
    }
  }
  async deleteProduct(productId: number): Promise<void> {
    try {
      await this.prisma.product.delete({ where: { id: productId } });
    } catch (e) {
      throw e;
    }
  }
}
