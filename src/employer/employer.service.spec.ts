import { Test, TestingModule } from '@nestjs/testing';
import { EmployerService } from './employer.service';
import { getModelToken } from '@nestjs/mongoose';
import { Employer } from './schema/employer.schema';

describe('EmployerService', () => {
  let service: EmployerService;

  const mockEmployerModel = {
    findOne: jest.fn().mockImplementation((query) =>
      Promise.resolve({
        _id: 'employerId',
        email: query.email,
        password: 'hashedPassword',
      }),
    ),
    create: jest
      .fn()
      .mockImplementation((dto) =>
        Promise.resolve({ _id: 'employerId', ...dto }),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployerService,
        {
          provide: getModelToken(Employer.name),
          useValue: mockEmployerModel,
        },
      ],
    }).compile();

    service = module.get<EmployerService>(EmployerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register employer', async () => {
    const result = await service.registerEmployer('abc@gmail.com', '1234567');

    expect(result).toEqual({
      _id: expect.any(String),
      email: 'abc@gmail.com',
      password: expect.any(String),
    });

    expect(mockEmployerModel.create).toHaveBeenCalledWith({
      email: 'abc@gmail.com',
      password: '1234567',
    });
  });

  it('should find an employer by email', async () => {
    const email = 'abc@gmail.com';
    const result = await service.findEmployer(email);
    expect(result).toEqual({
      _id: expect.any(String),
      email,
      password: expect.any(String),
    });

    expect(mockEmployerModel.findOne).toHaveBeenCalledWith({ email });
  });
});
