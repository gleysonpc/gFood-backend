import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  userId: number;
}
