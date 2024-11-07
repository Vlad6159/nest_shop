import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ProductDto } from 'src/dto/client/product.dto';
import { ProductDbDto } from 'src/dto/db/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async createProduct(product: ProductDto): Promise<ProductDbDto> {
    try {
      return await this.prisma.product.create({ data: product });
    } catch (e) {
      throw e;
    }
  }

  async getAllProducts(): Promise<ProductDbDto[]> {
    try {
      return await this.prisma.product.findMany();
    } catch (e) {
      throw e;
    }
  }

  async findByProductId(productId: number): Promise<ProductDbDto> {
    try {
      const product = await this.prisma.product.findFirst({
        where: { id: productId },
      });
      if (!product) {
        throw new NotFoundException(`Продукт с ID ${productId} не найден`);
      }
      return product;
    } catch (e) {
      throw e;
    }
  }

  async updateProduct(
    productId: number,
    product: ProductDto,
  ): Promise<ProductDbDto> {
    try {
      const productDb = await this.findByProductId(productId);
      if (!productDb) {
        throw new NotFoundException(`Продукт с ID ${productId} не найден`);
      }
      return await this.prisma.product.update({
        where: { id: productId },
        data: product,
      });
    } catch (e) {
      throw e;
    }
  }

  async deleteProduct(productId: number): Promise<ProductDbDto> {
    try {
      return await this.prisma.product.delete({ where: { id: productId } });
    } catch (e) {
      throw e;
    }
  }
}
