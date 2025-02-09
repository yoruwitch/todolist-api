import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { HasForbiddenNames } from '../validators/forbidden-words.validator';

export class UpdateTaskDTO {
  @IsString({ message: 'This is not a valid title' })
  @IsNotEmpty()
  @IsOptional()
  @HasForbiddenNames({
    message: 'The title contains forbidden words in Portuguese',
  })
  title: string;

  @IsString({ message: 'This is not a valid description' })
  @IsNotEmpty()
  @IsOptional()
  @HasForbiddenNames({
    message: 'The description contains forbidden words in Portuguese',
  })
  description: string;
}
