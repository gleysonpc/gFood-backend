import { Order } from 'src/order/order.entity';
import { Store } from 'src/store/store.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToOne((type) => Store, (store) => store.user, { eager: false })
  store: Store;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
