import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export default class AuthController {
  constructor(private readonly AuthService: AuthService) {}
  @Post('/signup')
  async signUp(@Body() data: UserDto) {
    await this.AuthService.createUser(data);
    return {
      message: 'Пользователь успешно зарегистрировался',
      status: '201',
    };
  }
  @Post('/signin')
  async signIn(@Body() data: UserDto) {
    await this.AuthService.authorizeUser(data);
    return {
      message: 'Пользователь успешно авторизировался',
    };
  }
}
