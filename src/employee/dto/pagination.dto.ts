import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  skip: string;

  @IsNumber()
  @IsOptional()
  limit: string;
}
