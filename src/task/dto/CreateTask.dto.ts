import { IsNotEmpty, IsString } from 'class-validator';
import { HasForbiddenNames } from '../validators/forbidden-words.validator';

export class CreateTaskDTO {
  id: string;

  @IsString({ message: 'This is not a valid title' })
  @IsNotEmpty()
  @HasForbiddenNames({
    message: 'The title contains forbidden words in Portuguese',
  })
  title: string;

  @HasForbiddenNames({
    message: 'The description contains forbidden words in Portuguese',
  })
  @IsString({ message: 'This is not a valid title' })
  @IsNotEmpty()
  description: string;
}
