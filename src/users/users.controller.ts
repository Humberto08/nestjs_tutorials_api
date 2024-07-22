import { Body, Controller, DefaultValuePipe, Delete, Get,  Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateUserInputDTO } from './dtos/createUserInput.dto';
import { UpdateUserInputDTO } from './dtos/updateUserInput.dto';
import { UsersService } from './user.service';



@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(@Query('id', new DefaultValuePipe(0), ParseIntPipe) id: 0) {
  return this.usersService.findAll(id);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Post()
  create(@Body() body: CreateUserInputDTO) {
    return this.usersService.create(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: 
    UpdateUserInputDTO) {
    return this.usersService.update(id, body);
  }


  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}


  

