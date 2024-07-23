import { PartialType } from '@nestjs/mapped-types';
import { CreateProductInputDTO } from './createProductInput.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductInputDTO extends PartialType(CreateProductInputDTO) {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  price: number;
}
