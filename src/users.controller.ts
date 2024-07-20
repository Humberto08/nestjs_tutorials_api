import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateUserInputDTO } from './dtos/createUserInput.dto';
import { UpdateUserInputDTO } from './dtos/updateUserInput.dto';



@Controller('users')
export class UsersController {
  @Get()
  findAll(@Query('id')  id: number) {
    if (id) {
      return 'Olá essa é a rota /users' + id;
    }

    return 'Olá essa é a rota /users';
  }

  @Get(':id')
  findById(@Param('id', new ParseIntPipe) id: number) {
    return id;
  }

  @Post()
  create(@Body() body: CreateUserInputDTO) {
    return body;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateUserInputDTO) {
    return body;
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return 'Delete user ' + id;
  }
}
