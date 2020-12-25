import { IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  userId: number;
}
