import {  IsNotEmpty, IsString } from 'class-validator';

export class CreateProductInputDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  price: number;
}
