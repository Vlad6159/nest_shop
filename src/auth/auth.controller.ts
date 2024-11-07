import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/dto/client/user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorize')
@Controller('/auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}
  @ApiOperation({
    summary: 'Зарегистрировать пользователя',
    description: 'Регистрация пользователя',
  })
  @ApiResponse({
    description: 'Пользователь успешно зарегистрировался',
    status: '2XX',
  })
  @ApiResponse({
    description: 'Ошибка сервера',
    status: '5XX',
  })
  @Post('/signup')
  async signUp(@Body() user: UserDto) {
    await this.AuthService.createUser(user);
    return {
      message: 'Пользователь успешно зарегистрировался',
      status: '201',
    };
  }

  @ApiOperation({
    summary: 'Авторизировать пользователя',
    description: 'Авторизирует пользователя на сайт',
  })
  @ApiResponse({
    description: 'Пользователь успешно авторизировался',
    status: '2XX',
  })
  @ApiResponse({
    description: 'Ошибка сервера',
    status: '5XX',
  })
  @Post('/signin')
  async signIn(@Body() data: UserDto) {
    await this.AuthService.authorizeUser(data);
    return {
      message: 'Пользователь успешно авторизировался',
    };
  }
}
