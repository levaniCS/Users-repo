/* eslint-disable prettier/prettier */
import {
  Body, Get, Post,
  Param, Delete, Patch,
  Query, UsePipes,
  ValidationPipe,
  UseGuards,
  Logger, 
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

import { TaskStatus } from './types/task-status.enum';
import { Task } from './types/task.type';
import { UserDoc } from 'src/auth/types/auth.type';

import { TasksService } from './tasks.service';
import { GetUser } from 'src/auth/get-user-decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController')
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: UserDoc) {

    console.log('GETTT', user)
    return this.tasksService.getTasks(filterDto);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }
  
  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user,
    ): Promise<Task> {
      this.logger.verbose(`userr ${user.name} creating tasks. ${createTaskDto}`)
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return await this.tasksService.deleteTask(id);
  }

  @Patch(':id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return await this.tasksService.updateTaskStatus(id, status);
  }

}
