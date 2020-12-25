import { Store } from 'src/store/store.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column('decimal', { precision: 8, scale: 2 })
  price: number;

  @ManyToOne(() => Store, (store) => store.producs, { eager: true })
  store: Store;

  @Column()
  storeId: number;
}
