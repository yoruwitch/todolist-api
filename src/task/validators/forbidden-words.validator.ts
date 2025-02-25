import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../task.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class HasForbiddenNamesValidator
  implements ValidatorConstraintInterface
{
  constructor(private taskRepository: TaskRepository) {}

  async validate(value: any): Promise<boolean> {
    if (!value || typeof value !== 'string' || value.trim() === '') {
      return true;
    }

    const containsForbiddenNames =
      await this.taskRepository.containsForbiddenNames(value);
    return !containsForbiddenNames;
  }
}

export const HasForbiddenNames = (validationOptions: ValidationOptions) => {
  return (object: object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: HasForbiddenNamesValidator,
    });
  };
};
