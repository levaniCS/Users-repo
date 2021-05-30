/* eslint-disable prettier/prettier */
import { ArgumentMetadata } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../types/task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
  ];
  transform(value: any, metadata: ArgumentMetadata) {    
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: TaskStatus) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
