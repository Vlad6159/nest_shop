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
      const products = await this.prisma.product.findMany();
      if (products.length === 0) {
        throw new NotFoundException('В бд отсутствуют товары');
      }
      return products;
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
        throw new NotFoundException(`Товар с ID ${productId} не найден`);
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
      await this.findByProductId(productId);
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
      await this.findByProductId(productId);
      return await this.prisma.product.delete({ where: { id: productId } });
    } catch (e) {
      throw e;
    }
  }
}
