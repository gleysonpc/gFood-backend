import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { Store } from './store.entity';

@Injectable()
export class StoreService {
  async index(): Promise<Store[]> {
    const stores = await Store.find();
    return stores;
  }

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    const store = new Store();
    store.description = createStoreDto.description;
    store.userId = createStoreDto.userId;

    await store.save();
    store.user = await User.findOne({ where: { id: createStoreDto.userId } });
    return store;
  }

  async show(id: number): Promise<Store> {
    const store = await Store.findOne({ where: { id } });
    return store;
  }

  async update(createStoreDto: CreateStoreDto, id: number): Promise<Store> {
    const store = await Store.findOne({ where: { id } });
    if (store) {
      store.description = createStoreDto.description;
      store.userId = createStoreDto.userId;
      await store.save();
      return store;
    }
  }
}
