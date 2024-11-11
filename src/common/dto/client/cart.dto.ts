import { ApiProperty } from '@nestjs/swagger';
import { ProductDbDto } from '../db/product.dto';

export class CartDto {
  @ApiProperty({ description: 'ID товара' })
  productId: number;
  @ApiProperty({ description: 'ID пользователя' })
  userId: number;
  @ApiProperty({ description: 'Количество товара' })
  quantity: number;
  @ApiProperty({ description: 'Информация о продукте', type: ProductDbDto })
  product: ProductDbDto;
}
