import { ApiProperty } from '@nestjs/swagger';

export class CategortyDto {
  @ApiProperty({ description: 'Название категории' })
  name: string;
}
