/* eslint-disable prettier/prettier */
import {
  Body, Get, Post,
  Param, Delete, Patch,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './types/user';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}


  @Get('/parse')
  parseUrl() {
    return this.usersService.getUsersFromUrl();
  }


  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }
  
  @Post()
  createTask(
    @Body() createTaskDto: CreateUserDto,
    ): Promise<User> {
    return this.usersService.createUser(createTaskDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return await this.usersService.deleteUser(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() createTaskDto: Partial<CreateUserDto>): Promise<User> {
    return await this.usersService.updateUser(id, createTaskDto);
  }
}
