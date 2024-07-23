import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateProductInputDTO } from './dto/createProductInput.dto';
import { UpdateProductInputDTO } from './dto/updateProductInput.dto';
import { ProductsService } from './products.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindUserByIdOutputDTO } from './dto/findProductByIdOutput.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiResponse({ type: FindUserByIdOutputDTO, isArray: true, status: 200 })
  @ApiQuery({ name: 'id', type: Number, required: false })
  findAll(@Query('id', new DefaultValuePipe(0), ParseIntPipe) id: number) {
    return this.productsService.findAll(id);
  }

  @Get(':id')
  @ApiResponse({ type: FindUserByIdOutputDTO, status: 200 })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findById(id);
  }

  @Post()
  create(@Body() body: CreateProductInputDTO) {
    return this.productsService.create(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductInputDTO) {
    return this.productsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}

