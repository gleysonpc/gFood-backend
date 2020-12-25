import { Injectable } from '@nestjs/common';
import { AppGateway } from 'src/app.gateway';
import { Store } from 'src/store/store.entity';
import { User } from 'src/user/user.entity';
import { OrderStatus } from './order-status.enum';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(private socket: AppGateway) {}

  async index(): Promise<Order[]> {
    const orders = await Order.find();
    return orders;
  }

  async create(user: User, store: Store): Promise<Order> {
    const order = new Order();
    order.user = user;
    order.store = store;
    await order.save();
    const { socketId } = this.socket.users.filter(
      (userConn) => userConn.userId === store.user.id,
    )[0];
    if (socketId) {
      this.socket.server.to(socketId).emit('sendOrderToStore', order);
    }

    return order;
  }

  async show(id: number): Promise<Order> {
    const order = await Order.findOne(id);
    if (order) {
      return order;
    }
  }

  async update(status: OrderStatus, id: number): Promise<Order> {
    const order = await Order.findOne(id);
    order.status = status;
    await order.save();
    return order;
  }

  async listOrdersByStore(storeId: number): Promise<Order[]> {
    const orders = await Order.find({ where: { storeId } });
    return orders;
  }
}
