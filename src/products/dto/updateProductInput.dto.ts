import { PartialType } from '@nestjs/mapped-types';
import { CreateProductInputDTO } from './createProductInput.dto';

export class UpdateProductInputDTO extends PartialType(CreateProductInputDTO) {}
