import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'Email пользователя' })
  email: string;
  @ApiProperty({ description: 'Имя пользователя' })
  name?: string;
  @ApiProperty({ description: 'Пароль пользователя' })
  password: string;
}
