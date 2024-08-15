import { Test, TestingModule } from '@nestjs/testing';
import { Gender } from './../utils/constants';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  const mockEmployeeService = {
    create: jest.fn((dto: CreateEmployeeDto) => {
      return {
        _id: 'someUniqueId',
        ...dto,
      };
    }),
    findAll: jest.fn(() => []),
    findOne: jest.fn((id: string) => ({
      _id: id,
      firstName: 'John',
      lastName: 'Doe',
      gender: Gender.MALE,
      physicalAddress: '123 Main St',
      emailAddress: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      dateOfBirth: new Date('1990-01-01'),
      emergencyPhoneNumber: '+0987654321',
      educationalLevel: 'Masters',
      employmentRole: 'Developer',
      employmentStartDate: new Date('2020-01-01'),
      bankName: 'Bank',
      bankAccountNumber: '1234567890',
      accountName: 'John Doe',
      nextOfKinFullName: 'Jane Doe',
      nextOfKinPhoneNumber: '+1234567890',
      nextOfKinRelationship: 'Spouse',
    })),
    update: jest.fn((id: string, dto: UpdateEmployeeDto) => ({
      _id: id,
      ...dto,
    })),
    remove: jest.fn((id: string) => ({ _id: id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
          useValue: mockEmployeeService,
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should create an employee', async () => {
    const dto: CreateEmployeeDto = {
      firstName: 'John',
      lastName: 'Doe',
      gender: Gender.MALE,
      physicalAddress: '123 Main St',
      emailAddress: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      dateOfBirth: new Date('1990-01-01'),
      emergencyPhoneNumber: '+0987654321',
      educationalLevel: 'Masters',
      employmentRole: 'Developer',
      employmentStartDate: new Date('2020-01-01'),
      bankName: 'Bank',
      bankAccountNumber: '1234567890',
      accountName: 'John Doe',
      nextOfKinFullName: 'Jane Doe',
      nextOfKinPhoneNumber: '+1234567890',
      nextOfKinRelationship: 'Spouse',
    };

    expect(await controller.createEmployee(dto)).toEqual({
      _id: expect.any(String),
      ...dto,
    });

    expect(mockEmployeeService.create).toHaveBeenCalledWith(dto);
  });

  it('should get all employees', async () => {
    expect(await controller.getEmployees({ skip: 0, limit: 10 })).toEqual([]);
    expect(mockEmployeeService.findAll).toHaveBeenCalledWith({
      skip: 0,
      limit: 10,
    });
  });

  it('should get one employee by ID', async () => {
    const id = 'someUniqueId';
    expect(await controller.getEmployee(id)).toEqual({
      _id: id,
      firstName: 'John',
      lastName: 'Doe',
      gender: Gender.MALE,
      physicalAddress: '123 Main St',
      emailAddress: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      dateOfBirth: new Date('1990-01-01'),
      emergencyPhoneNumber: '+0987654321',
      educationalLevel: 'Masters',
      employmentRole: 'Developer',
      employmentStartDate: new Date('2020-01-01'),
      bankName: 'Bank',
      bankAccountNumber: '1234567890',
      accountName: 'John Doe',
      nextOfKinFullName: 'Jane Doe',
      nextOfKinPhoneNumber: '+1234567890',
      nextOfKinRelationship: 'Spouse',
    });
    expect(mockEmployeeService.findOne).toHaveBeenCalledWith(id);
  });

  it('should update an employee', async () => {
    const id = 'someUniqueId';
    const dto: UpdateEmployeeDto = {
      firstName: 'John',
      lastName: 'Doe',
      gender: Gender.MALE,
      physicalAddress: '123 Main St',
      emailAddress: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      dateOfBirth: new Date('1990-01-01'),
      emergencyPhoneNumber: '+0987654321',
      educationalLevel: 'Masters',
      employmentRole: 'Developer',
      employmentStartDate: new Date('2020-01-01'),
      bankName: 'Bank',
      bankAccountNumber: '1234567890',
      accountName: 'John Doe',
      nextOfKinFullName: 'Jane Doe',
      nextOfKinPhoneNumber: '+1234567890',
      nextOfKinRelationship: 'Spouse',
    };
    expect(await controller.updateEmployee(id, dto)).toEqual({
      _id: id,
      ...dto,
    });
    expect(mockEmployeeService.update).toHaveBeenCalledWith(id, dto);
  });

  it('should remove an employee', async () => {
    const id = 'someUniqueId';
    expect(await controller.removeEmployee(id)).toEqual({ _id: id });
    expect(mockEmployeeService.remove).toHaveBeenCalledWith(id);
  });
});
