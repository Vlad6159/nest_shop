import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'prisma/prisma.service';
import { ProductDto } from 'src/dto/client/product.dto';
import { ProductDbDto } from 'src/dto/db/product.dto';
import { ProductService } from './product.service';

@ApiTags('Products')
@Controller('/product')
export class ProductController {
  constructor(
    private readonly ProductService: ProductService,
    private readonly prisma: PrismaService,
  ) {}

  @ApiOperation({
    summary: 'Вернуть массив товаров',
    description: 'Позволяет вернуть массив всех товаров',
  })
  @ApiResponse({
    status: '2XX',
    description: 'Успешно вернул массив всех товаров',
    type: ProductDbDto,
  })
  @ApiResponse({
    status: '5XX',
    description: 'Ошибка сервера',
  })
  @Get()
  async getAllProduct() {
    const products = await this.ProductService.getAllProducts();
    return {
      message: 'Успешно вернул массив всех товаров',
      products,
    };
  }

  @ApiOperation({
    summary: 'Добавить товар',
    description: 'Позволяет добавить новый товар в бд',
  })
  @ApiResponse({
    status: '2XX',
    description: 'Новый товар добавлен',
    type: ProductDbDto,
  })
  @ApiResponse({
    status: '5XX',
    description: 'Ошибка сервера',
  })
  @Post('/create')
  async addProduct(@Body() product: ProductDto) {
    const createdProduct = await this.ProductService.createProduct(product);
    return {
      message: 'Новый товар добавлен',
      createdProduct,
    };
  }

  @ApiOperation({
    summary: 'Обновить товара',
    description: 'Полное обновление товара',
  })
  @ApiQuery({
    name: 'id',
    description: 'ID товара',
    required: true,
    type: Number,
    example: '1',
  })
  @ApiResponse({
    status: '2XX',
    description: 'Товар успешно обновлен',
    type: ProductDbDto,
  })
  @ApiResponse({
    status: '4XX',
    description: 'Продукт с ID 10 не найден',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Ошибка сервера',
  })
  @Put('/update/:id')
  async updateProductPut(@Param('id') id: string, @Body() product: ProductDto) {
    const productId = parseInt(id, 10);
    const updatedProduct = await this.ProductService.updateProduct(
      productId,
      product,
    );
    return {
      message: 'Товар успешно обновлен',
      updatedProduct,
    };
  }

  @ApiOperation({
    summary: 'Частично обновить товар',
    description: 'Частичное обновление товара в бд',
  })
  @ApiQuery({
    name: 'id',
    description: 'ID товара',
    required: true,
    type: Number,
    example: '1',
  })
  @ApiResponse({
    status: '2XX',
    description: 'Товар успешно обновлен',
    type: ProductDbDto,
  })
  @ApiResponse({
    status: '4XX',
    description: 'Продукт с ID 10 не найден',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Ошибка сервера',
  })
  @Patch('/update/:id')
  async updateProductPatch(
    @Param('id') id: string,
    @Body() product: ProductDto,
  ) {
    const productId = parseInt(id, 10);
    const updatedProduct = await this.ProductService.updateProduct(
      productId,
      product,
    );
    return {
      message: 'Товар успешно обновлен',
      updatedProduct,
    };
  }

  @ApiOperation({
    summary: 'Удалить товар',
    description: 'Удаление товара из бд',
  })
  @ApiQuery({
    name: 'id',
    description: 'ID товара',
    required: true,
    type: Number,
    example: '1',
  })
  @ApiResponse({
    status: '2XX',
    description: 'Товар удален',
    type: ProductDbDto,
  })
  @ApiResponse({
    status: '4XX',
    description: 'Продукт с ID 10 не найден',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Ошибка сервера',
  })
  @Delete('/delete/:id')
  async deleteProduct(@Param('id') id: string) {
    const productId = parseInt(id, 10);

    await this.ProductService.findByProductId(productId);

    const deletedProduct = await this.ProductService.deleteProduct(productId);
    return {
      message: 'Товар удален',
      deletedProduct,
    };
  }
}
