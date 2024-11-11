import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductDbDto } from 'src/common/dto/db/product.dto';
import { ProductService } from './product.service';
import { ProductDto } from 'src/common/dto/client/product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}

  @Get()
  @ApiOperation({
    summary: 'Получить массив товаров',
    description: 'Позволяет получить массив всех товаров',
  })
  @ApiResponse({
    status: '2XX',
    description: 'Массив товаров успешно получен',
    type: ProductDbDto,
  })
  @ApiResponse({
    status: '5XX',
    description: 'Ошибка сервера',
  })
  async getAllProduct() {
    const products = await this.ProductService.getAllProducts();
    return {
      message: 'Успешно вернул массив всех товаров',
      products,
    };
  }

  @Post()
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
  async addProduct(@Body() product: ProductDto) {
    const createdProduct = await this.ProductService.createProduct(product);
    return {
      message: 'Новый товар добавлен',
      createdProduct,
    };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Обновить товара',
    description: 'Полное обновление товара',
  })
  @ApiParam({
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
    description: `Продукт указанным ID не найден`,
  })
  @ApiResponse({
    status: '5XX',
    description: 'Ошибка сервера',
  })
  async updateProductPut(
    @Param('id', new ParseIntPipe()) productId: number,
    @Body() product: ProductDto,
  ) {
    const updatedProduct = await this.ProductService.updateProduct(
      productId,
      product,
    );
    return {
      message: 'Товар успешно обновлен',
      updatedProduct,
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Частично обновить товар',
    description: 'Частичное обновление товара в бд',
  })
  @ApiParam({
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
    description: 'Продукт указанным ID не найден',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Ошибка сервера',
  })
  async updateProductPatch(
    @Param('id', new ParseIntPipe()) productId: number,
    @Body() product: ProductDto,
  ) {
    await this.ProductService.findByProductId(productId);
    const updatedProduct = await this.ProductService.updateProduct(
      productId,
      product,
    );
    return {
      message: 'Товар успешно обновлен',
      updatedProduct,
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Удалить товар',
    description: 'Удаление товара из бд',
  })
  @ApiParam({
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
    description: 'Продукт указанным ID не найден',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Ошибка сервера',
  })
  async deleteProduct(@Param('id', new ParseIntPipe()) productId: number) {
    const deletedProduct = await this.ProductService.deleteProduct(productId);
    return {
      message: 'Товар удален',
      deletedProduct,
    };
  }
}
