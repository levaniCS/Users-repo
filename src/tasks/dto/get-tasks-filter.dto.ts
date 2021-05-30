import { IsIn, IsOptional, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../types/task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.OPEN, TaskStatus.IN_PROGRESS])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}