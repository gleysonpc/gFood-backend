import { IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../order-status.enum';

export class CreateOrderDto {
  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  storeId: number;

  status: OrderStatus;
}
