// import { Injectable } from '@nestjs/common';
// import { CreateProductInputDto } from './dto/createProductInput.dto';
// import { UpdateProductInputDto } from './dto/updateProductInput.dto';
// import { PrismaService } from 'src/prisma.service';

// @Injectable()
// export class ProductsService {
//   constructor(private prisma: PrismaService) {}

//   create(createProductDto: CreateProductInputDto) {
//     return 'This action adds a new product';
//   }

//   findAll() {
//     return `This action returns all products`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} product`;
//   }

//   update(id: number, updateProductInputDto: UpdateProductInputDto) {
//     return `This action updates a #${id} product`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} product`;
//   }
// }


import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CreateProductInputDTO } from './dto/createProductInput.dto';
import { UpdateProductInputDTO } from './dto/updateProductInput.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(id?: number) {
    if (id) {
      const product = await this.prisma.product.findUnique({ where: { id } });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    }

    const products = await this.prisma.product.findMany();
    return products;
  }

  async findById(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async create(body: CreateProductInputDTO) {
    const product = await this.prisma.product.findUnique({ where: { name: body.name } });
    if (product) {
      throw new BadRequestException('Product already exists');
    }
    const newProduct = await this.prisma.product.create({ data: body });
    return newProduct;
  }

  async update(id: number, updateProductDto: UpdateProductInputDTO) {
    const product = await this.findById(id);
    if (!product) throw new NotFoundException('Product not found');

    const updatedProduct = await this.prisma.product.update({ where: { id }, data: updateProductDto });
    return updatedProduct;
  }

  async delete(id: number) {
    const product = await this.findById(id);
    if (!product) throw new NotFoundException('Product not found');

    await this.prisma.product.delete({ where: { id } });
    return { message: 'Product deleted' };
  }
}
