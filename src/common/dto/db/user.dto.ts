import { ApiProperty } from '@nestjs/swagger';

export class UserDbDto {
  @ApiProperty({ description: 'ID пользователя' })
  id: number;
  @ApiProperty({ description: 'Email пользователя' })
  email: string;
  @ApiProperty({ description: 'Имя пользователя' })
  name?: string;
  @ApiProperty({ description: 'Дата создания' })
  created_at: Date;
  @ApiProperty({ description: 'Дата обновления' })
  updated_at: Date;
}
