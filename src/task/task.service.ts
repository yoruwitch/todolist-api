import { InjectRepository } from '@nestjs/typeorm';
import { ListTaskDTO } from './dto/ListTask.dto';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UpdateTaskDTO } from './dto/UpdateTask.dto';

@Injectable()
export class TaskService {
  constructor(
    // para criar um repositório encima de uma entitdade já existente
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async createTask(taskEntity: TaskEntity) {
    await this.taskRepository.save(taskEntity);
  }

  async listTasks() {
    const listedTasks = await this.taskRepository.find();
    const listTasks = listedTasks.map(
      (task) => new ListTaskDTO(task.id, task.title, task.description),
    );
    return listTasks;
  }

  async updateTask(id: string, taskEntity: UpdateTaskDTO) {
    await this.taskRepository.update(id, taskEntity);
    return taskEntity;
  }

  async deleteTask(id: string) {
    await this.taskRepository.delete(id);
  }
}

// os métodos de save e find são próprios do InjectRepository
