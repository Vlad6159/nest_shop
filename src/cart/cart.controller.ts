import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartDto } from 'src/dto/client/cart.dto';
import { CartService } from './cart.service';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly CartService: CartService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Получить корзину',
    description: 'Возвращает массив продуктов в корзине пользователя',
  })
  @ApiParam({
    name: 'userId',
    description: 'ID пользователя',
    required: true,
    type: Number,
    example: '1',
  })
  @ApiResponse({
    status: '2XX',
    description: 'Корзина пользователя успешно получена',
    type: [CartDto],
  })
  @ApiResponse({
    status: '5XX',
    description: 'Ошибка сервера',
  })
  async getUserCart(@Param('userId', new ParseIntPipe()) userId: number) {
    const cart = await this.CartService.findUserCart(userId);
    return {
      message: 'Успешно вернул корзину пользователя',
      cart,
    };
  }

  @Post(':id')
  @ApiOperation({
    summary: 'Добавить товар в корзину',
    description: 'Добавляет товар в корзину',
  })
  @ApiParam({
    name: 'userId',
    description: 'ID пользователя',
    required: true,
    type: Number,
    example: '1',
  })
  @ApiResponse({
    status: '2XX',
    description: 'Успешно добавил товар в корзину',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Ошибка сервера',
  })
  async addProductToCart(
    @Param('userId', new ParseIntPipe()) userId: number,
    @Body('productId', new ParseIntPipe()) productId: number,
    @Body('quantity', new ParseIntPipe()) quantity: number,
  ) {
    await this.CartService.addProductToCart(userId, productId, quantity);
    return {
      message: 'Продукт добавлен в корзину',
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Очистить корзину',
    description: 'Очищает корзину пользователя',
  })
  @ApiParam({
    name: 'userId',
    description: 'ID пользователя',
    required: true,
    type: Number,
    example: '1',
  })
  @ApiResponse({
    status: '2XX',
    description: 'Успешно очистил корзину пользователя',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Ошибка сервера',
  })
  async deleteUserCart(@Param('userId', new ParseIntPipe()) userId: number) {
    const cart = await this.CartService.deleteCart(userId);
    return {
      message: 'Корзина пользователя была очищена',
    };
  }
}
