import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class EmployerDto {
  @IsOptional()
  _id: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
