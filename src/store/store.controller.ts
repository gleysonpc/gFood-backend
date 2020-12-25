import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { StoreService } from './store.service';

@Controller('stores')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Get()
  index() {
    return this.storeService.index();
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number) {
    return this.storeService.show(id);
  }

  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Patch(':id')
  update(
    @Body() createStoreDto: CreateStoreDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.storeService.update(createStoreDto, id);
  }
}
