import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../order-status.enum';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  storeId: number;

  @ApiProperty()
  status: OrderStatus;
}
