import { Order } from 'src/order/order.entity';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('stores')
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.store, { eager: true })
  user: User;

  @OneToMany(() => Product, (product) => product.store)
  producs: Product[];

  @Column()
  userId: number;

  @OneToMany(() => Order, (order) => order.store)
  orders: Order[];
}
