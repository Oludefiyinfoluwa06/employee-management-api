import { Test, TestingModule } from '@nestjs/testing';
import { Gender } from './../utils/constants';
import { EmployeeService } from './employee.service';
import { getModelToken } from '@nestjs/mongoose';
import { Employee } from './schema/employee.schema';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let model: Model<Employee>;

  const mockEmployee = {
    _id: 'someEmployeeId',
    firstName: 'John',
    lastName: 'Doe',
    emailAddress: 'johndoe@example.com',
    gender: Gender.MALE,
    phoneNumber: '1234567890',
    physicalAddress: '123 Main St',
    dateOfBirth: new Date(),
    emergencyPhoneNumber: '0987654321',
    educationalLevel: 'Bachelor',
    employmentRole: 'Engineer',
    employmentStartDate: new Date(),
    bankName: 'Some Bank',
    bankAccountNumber: '12345678',
    accountName: 'John Doe',
    fullName: 'Jane Doe',
    relationship: 'Wife',
  };

  const mockEmployeeModel = {
    create: jest.fn().mockResolvedValue(mockEmployee),
    findOne: jest.fn(),
    find: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnValue([mockEmployee]),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockEmployee),
    findByIdAndDelete: jest.fn().mockResolvedValue(mockEmployee),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getModelToken(Employee.name),
          useValue: mockEmployeeModel,
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
    model = module.get<Model<Employee>>(getModelToken(Employee.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new employee', async () => {
      mockEmployeeModel.findOne.mockResolvedValue(null);

      const createEmployeeDto: CreateEmployeeDto = {
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

      expect(await service.create(createEmployeeDto)).toEqual(mockEmployee);
      expect(mockEmployeeModel.create).toHaveBeenCalledWith(createEmployeeDto);
    });

    it('should throw a conflict exception if the email address exists', async () => {
      mockEmployeeModel.findOne.mockResolvedValue(mockEmployee);

      const createEmployeeDto: CreateEmployeeDto = {
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

      await expect(service.create(createEmployeeDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of employees', async () => {
      const paginationDto = { skip: 1, limit: 10 };
      const result = await service.findAll(paginationDto);

      expect(result).toEqual([mockEmployee]);
      expect(mockEmployeeModel.find).toHaveBeenCalled();
      expect(mockEmployeeModel.skip).toHaveBeenCalledWith((1 - 1) * 10);
      expect(mockEmployeeModel.limit).toHaveBeenCalledWith(10);
    });
  });

  describe('findOne', () => {
    it('should return a single employee', async () => {
      mockEmployeeModel.findById.mockResolvedValue(mockEmployee);

      const result = await service.findOne('someEmployeeId');
      expect(result).toEqual(mockEmployee);
      expect(mockEmployeeModel.findById).toHaveBeenCalledWith('someEmployeeId');
    });

    it('should throw a NotFoundException if the employee is not found', async () => {
      mockEmployeeModel.findById.mockResolvedValue(null);

      await expect(service.findOne('someEmployeeId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update an employee', async () => {
      mockEmployeeModel.findById.mockResolvedValue(mockEmployee);

      const updateEmployeeDto: UpdateEmployeeDto = {
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

      const result = await service.update('someEmployeeId', updateEmployeeDto);
      expect(result).toEqual(mockEmployee);
      expect(mockEmployeeModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'someEmployeeId',
        updateEmployeeDto,
        { new: true },
      );
    });

    it('should throw a NotFoundException if the employee to update is not found', async () => {
      mockEmployeeModel.findById.mockResolvedValue(null);

      const updateEmployeeDto: UpdateEmployeeDto = {
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

      await expect(
        service.update('someEmployeeId', updateEmployeeDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an employee', async () => {
      const result = await service.remove('someEmployeeId');
      expect(result).toEqual(mockEmployee);
      expect(mockEmployeeModel.findByIdAndDelete).toHaveBeenCalledWith(
        'someEmployeeId',
      );
    });
  });
});
