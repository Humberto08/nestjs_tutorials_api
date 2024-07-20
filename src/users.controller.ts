import { Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(@Query('id') id: number) {
    if (id) {
      return 'Olá essa é a rota /users' + id;
    }

    return 'Olá essa é a rota /users';
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return id;
  }

  @Post()
  create() {
    return 'Create user';
  }

  @Put(':id')
  update(@Param('id') id: number) {
    return 'Update user ' + id;
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return 'Delete user ' + id;
  }
}
