import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDTO {
  @IsString({ message: 'This is not a valid title' })
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsString({ message: 'This is not a valid description' })
  @IsNotEmpty()
  @IsOptional()
  description: string;
}
