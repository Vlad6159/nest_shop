import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDbDto } from 'src/common/dto/db/user.dto';
import { CartService } from '../cart/cart.service';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export default class UserController {
  constructor(
    private readonly UserService: UserService,
    private readonly CartService: CartService,
  ) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Получить данные пользователя',
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
    description: 'Данные пользователя успешно получены',
    type: UserDbDto,
  })
  @ApiResponse({
    status: '5XX',
    description: 'Ошибка сервера',
  })
  async getUserData(@Param('id', new ParseIntPipe()) userId: number) {
    const userData = await this.UserService.getUserData(userId);
    return {
      message: 'Данные пользователя успешно получены',
      userData,
    };
  }

  @Get('/cart')
  @ApiOperation({
    summary: 'Получить корзину пользователя',
  })
  @ApiResponse({
    status: '2XX',
    description: 'Корзина пользователя успешно получена',
  })
  async getUserCart(userId) {
    const cart = await this.CartService.findUserCart(userId);
    return {
      message: 'Корзина пользователя успешно получена',
      cart,
    };
  }
}
