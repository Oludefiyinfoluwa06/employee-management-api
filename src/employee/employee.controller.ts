import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';
import { PaginationDto } from './dto/pagination.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @UseGuards(JwtGuard)
  @Post()
  createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  getEmployees(@Query() paginationDto: PaginationDto) {
    return this.employeeService.findAll(paginationDto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getEmployee(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  updateEmployee(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  removeEmployee(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }
}
