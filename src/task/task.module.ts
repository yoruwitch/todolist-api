import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
// import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskRepository],
})
export class TaskModule {}
