import { Injectable } from '@nestjs/common';
import { TaskEntity } from './task.entity';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class TaskRepository {
  private tasks: TaskEntity[] = [];
  public forbiddenPatterns: RegExp[];

  constructor() {
    this.loadForbiddenWords();
  }

  private loadForbiddenWords() {
    const filePath = path.resolve(
      __dirname,
      '../../src/assets/forbidden-words.json',
    );
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const forbiddenWords = JSON.parse(fileContent) as string[];
    this.forbiddenPatterns = forbiddenWords.map(
      (pattern) => new RegExp(pattern, 'i'),
    );
  }

  async saveTask(task: TaskEntity) {
    this.tasks.push(task);
  }

  async listAllTasks() {
    return this.tasks;
  }

  async findTaskById(id: string) {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new Error('This task does not exist');
    }

    return task;
  }

  async containsForbiddenNames(text: string) {
    const lowerCaseText = text.toLowerCase();
    return this.forbiddenPatterns.some((regex) => regex.test(lowerCaseText));
  }

  async updateTask(id: string, dataToUpdate: Partial<TaskEntity>) {
    const taskUpdated = await this.findTaskById(id);
    Object.entries(dataToUpdate).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }
      taskUpdated[key] = value;
    });

    return taskUpdated;
  }
}
