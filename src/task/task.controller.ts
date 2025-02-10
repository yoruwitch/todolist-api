import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/CreateTask.dto';
import { TaskRepository } from './task.repository';
import { TaskEntity } from './task.entity';
import { randomUUID } from 'crypto';
import { UpdateTaskDTO } from './dto/UpdateTask.dto';

@Controller('/tasks')
export class TaskController {
  constructor(private taskRepository: TaskRepository) {}

  @Get()
  async listTasks() {
    return this.taskRepository.listAllTasks();
  }

  @Post()
  async createNewTask(@Body() taskData: CreateTaskDTO) {
    const taskEntity = new TaskEntity();
    taskEntity.description = taskData.description;
    taskEntity.id = randomUUID();
    taskEntity.title = taskData.title;

    await this.taskRepository.saveTask(taskEntity);

    return {
      task: taskEntity.title,
      message: 'A new task has been created successfully',
    };
  }

  @Put('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() updatedTask: UpdateTaskDTO,
  ) {
    const taskUpdated = await this.taskRepository.updateTask(id, updatedTask);
    return {
      task: taskUpdated,
      message: 'Task information has been updated successfully',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedTask = await this.taskRepository.remove(id);
    return {
      user: deletedTask,
      message: 'The task has been removed successfully',
    };
  }
}
