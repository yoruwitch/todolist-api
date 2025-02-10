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
import { UpdateTaskDTO } from './dto/UpdateTask.dto';
import { TaskService } from './task.service';
import { randomUUID } from 'crypto';

@Controller('/tasks')
export class TaskController {
  constructor(
    private taskRepository: TaskRepository,
    private taskService: TaskService,
  ) {}

  @Get()
  async listTasks() {
    return this.taskService.listTasks();
  }

  @Post()
  async createNewTask(@Body() taskData: CreateTaskDTO) {
    const taskEntity = new TaskEntity();
    taskEntity.description = taskData.description;
    taskEntity.id = randomUUID();
    taskEntity.title = taskData.title;

    await this.taskService.createTask(taskEntity);
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
    const taskUpdated = await this.taskService.updateTask(id, updatedTask);
    return {
      task: taskUpdated,
      message: 'Task information has been updated successfully',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedTask = await this.taskService.deleteTask(id);
    return {
      user: deletedTask,
      message: 'The task has been removed successfully',
    };
  }
}
