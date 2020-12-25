import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Store } from 'src/store/store.entity';
import { User } from 'src/user/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './order-status.enum';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  index() {
    return this.orderService.index();
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.show(id);
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const { userId, storeId } = createOrderDto;
    const user = await User.findOne(userId);
    const store = await Store.findOne(storeId);
    if (user && store) {
      return this.orderService.create(user, store);
    }
  }

  @Patch(':id')
  update(@Body('status') status: OrderStatus, @Param('id') id: number) {
    return this.orderService.update(status, id);
  }

  @Get('bystore/:id')
  listByStore(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.listOrdersByStore(id);
  }
}
