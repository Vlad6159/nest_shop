import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ProductDto } from 'src/dto/product.dto';
import { ProductService } from './product.service';
import { PrismaService } from 'prisma/prisma.service';

@Controller()
export default class ProductController {
  constructor(
    private readonly ProductService: ProductService,
    private readonly prisma: PrismaService,
  ) {}
  @Post('/create')
  async addProduct(@Body() product: ProductDto) {
    await this.ProductService.createProduct(product);
    return {
      message: 'Новый товар добавлен',
    };
  }

  @Patch()
  async updateProduct(@Body() product: ProductDto) {
    const updatedProduct = await this.prisma.product.update({
      where: { id: product.id },
      data: product,
    });
    return {
      message: updatedProduct,
    };
  }

  @Delete('/delete:id')
  async deleteProduct(@Param() productId: number) {
    await this.ProductService.deleteProduct(productId);
    return {
      message: 'Товар удален',
    };
  }
}
