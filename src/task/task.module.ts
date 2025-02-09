import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { HasForbiddenNamesValidator } from './validators/forbidden-words.validator';
// import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskRepository, HasForbiddenNamesValidator],
})
export class TaskModule {}
