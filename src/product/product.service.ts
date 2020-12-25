import { Injectable } from '@nestjs/common';
import { Store } from 'src/store/store.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  async index(storeId: number = null): Promise<Product[]> {
    if (storeId) {
      const products = await Product.find({ where: { storeId } });
      return products;
    }
    const products = await Product.find();
    return products;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { description, price, storeId } = createProductDto;
    const product = new Product();
    const store = await Store.findOne(storeId);
    product.description = description;
    product.price = price;
    product.store = store;
    await product.save();
    return product;
  }

  async show(id: number): Promise<Product> {
    const product = await Product.findOne({ where: { id } });
    if (product) {
      return product;
    }
  }

  async update(
    createProductDto: CreateProductDto,
    id: number,
  ): Promise<Product> {
    const { description, price } = createProductDto;
    const product = await Product.findOne(id);
    if (product) {
      product.description = description;
      product.price = price;
      await product.save();
      return product;
    }
  }
}
