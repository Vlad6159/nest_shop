import { ApiProperty } from '@nestjs/swagger';

export class CategoryDbDto {
  @ApiProperty({ description: 'ID категории' })
  id: number;
  @ApiProperty({ description: 'Название категории' })
  name: string;
  @ApiProperty({ description: 'Дата создания' })
  created_at: Date;
  @ApiProperty({ description: 'Дата обновления' })
  updated_at: Date;
}
