import { Store } from 'src/store/store.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from './order-status.enum';

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'PENDING' })
  status: OrderStatus;

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Store, (store) => store.orders, { eager: true })
  store: Store;

  @Column()
  storeId: number;
}
