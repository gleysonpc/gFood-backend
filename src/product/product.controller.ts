import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  index(@Query('storeId') storeId: string | null = null) {
    return this.productService.index(parseInt(storeId));
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number) {
    return this.productService.show(id);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Patch(':id')
  update(
    @Body() createProductDto: CreateProductDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Product> {
    return this.productService.update(createProductDto, id);
  }
}
