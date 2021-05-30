import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose'
import { UserDoc } from 'src/auth/types/auth.type';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

import { TaskStatus } from './types/task-status.enum';
import { Task } from './types/task.type';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Tasks') private taskModel: Model<Task & Document>) {}

  // Using task model directly
  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.taskModel.findByIdAndUpdate(id, { status }, { new: true })
    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskModel.findOne();
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async deleteTask(id: string): Promise<void> {
    // Handle case when id doesn't exists
    const found = await this.taskModel.findById(id)
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    await this.taskModel.deleteOne({ _id: id})
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const queryString: any  = {}

    if(status) queryString.status = status
    if(search) queryString.title = { $regex: `.*${search}.*` };
    
    const tasks = this.taskModel.find(queryString).select('-__v -id')
    return tasks;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserDoc,
    ): Promise<Task> {
    const newTask = new this.taskModel({
      ...createTaskDto,
      userId: user?._id || '60b375bb65c2ba1c502b7ee6'
    }).populate('Auth')
    await newTask.save()

    return newTask;
  }
}
