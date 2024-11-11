import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ description: 'Имя товара' })
  name: string;
  @ApiProperty({ description: 'Цена товара' })
  price: number;
}
