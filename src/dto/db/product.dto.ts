import { ApiProperty } from '@nestjs/swagger';

export class ProductDbDto {
  @ApiProperty({ description: 'ID товара' })
  id: number;
  @ApiProperty({ description: 'Название товара' })
  name: string;
  @ApiProperty({ description: 'Цена товара' })
  price: number;
  @ApiProperty({ description: 'Дата создания' })
  created_at: Date;
  @ApiProperty({ description: 'Дата обновления' })
  updated_at: Date;
}
