import { IsEmail, MinLength } from 'class-validator';

export class EmployerDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
