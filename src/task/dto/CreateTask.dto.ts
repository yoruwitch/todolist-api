import { IsNotEmpty, IsString } from 'class-validator';
import { HasForbiddenNames } from '../validators/forbidden-words.validator';

export class CreateTaskDTO {
  id: string;

  @IsString({ message: 'This is not a valid title' })
  @IsNotEmpty({ message: 'You must add a title' })
  @HasForbiddenNames({
    message: 'The title contains forbidden words in Portuguese',
  })
  title: string;

  @IsString({ message: 'This is not a valid description' })
  @IsNotEmpty({ message: 'You must add a description to your task' })
  @HasForbiddenNames({
    message: 'The description contains forbidden words in Portuguese',
  })
  description: string;
}
