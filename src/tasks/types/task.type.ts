import { TaskStatus } from './task-status.enum';

export class Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
}