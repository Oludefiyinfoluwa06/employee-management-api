import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './schema/employee.schema';
import { Model } from 'mongoose';
import { PaginationDto } from './dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const existingEmployee = await this.employeeModel.findOne({
      'personalInformation.emailAddress':
        createEmployeeDto.personalInformation.emailAddress,
    });

    if (existingEmployee) {
      throw new ConflictException('Email address already exists');
    }

    return await this.employeeModel.create(createEmployeeDto);
  }

  async findAll(paginationDto: PaginationDto) {
    return await this.employeeModel.find({
      skip: paginationDto.skip,
      take: paginationDto.limit ?? DEFAULT_PAGE_SIZE,
    });
  }

  async findOne(id: string) {
    const employee = await this.employeeModel.findById(id);

    if (!employee) throw new NotFoundException('Employee not found');

    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.employeeModel.findByIdAndDelete(id);
  }
}
