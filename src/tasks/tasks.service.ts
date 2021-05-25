import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task: Task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task: Task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task: Task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  deleteTask(id: string): void {
    const found = this.getAllTasks()
    this.tasks = this.tasks.filter((task: Task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;

    return task;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const { description, title } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
