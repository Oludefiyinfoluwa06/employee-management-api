import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { EmployerService } from './../employer/employer.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  const mockEmployerService = {
    findEmployer: jest.fn((email: string) => {
      if (email === 'abc@gmail.com') {
        return {
          _id: 'employerId',
          email: 'abc@gmail.com',
          password: 'hashedPassword',
        };
      } else {
        return null;
      }
    }),
    registerEmployer: jest.fn((email: string, password: string) => ({
      _id: 'employerId',
      email,
      password,
    })),
  };

  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue('accessToken'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: EmployerService,
          useValue: mockEmployerService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate employer information', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);

    const result = await service.validateEmployer('abc@gmail.com', '12345678');

    expect(result).toEqual({
      _id: 'employerId',
      email: 'abc@gmail.com',
    });

    expect(mockEmployerService.findEmployer).toHaveBeenCalledWith(
      'abc@gmail.com',
    );
  });

  it('should throw NotFoundException if employer does not exist', async () => {
    await expect(
      service.validateEmployer('nonexistent@gmail.com', '12345678'),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw UnauthorizedException if password does not match', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never);

    await expect(
      service.validateEmployer('abc@gmail.com', 'wrong-password'),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should register a new employer', async () => {
    jest.spyOn(bcrypt, 'genSalt').mockResolvedValueOnce('salt' as never);
    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashedPassword' as never);

    const employerDto = { email: 'new@gmail.com', password: '12345678' };

    const result = await service.register(employerDto);

    expect(mockEmployerService.findEmployer).toHaveBeenCalledWith(
      'new@gmail.com',
    );
    expect(mockEmployerService.registerEmployer).toHaveBeenCalledWith(
      'new@gmail.com',
      'hashedPassword',
    );
    expect(result).toEqual({ accessToken: 'accessToken' });
  });

  it('should throw ConflictException if employer already exists', async () => {
    const employerDto = { email: 'abc@gmail.com', password: '12345678' };

    await expect(service.register(employerDto)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should return access token on login', async () => {
    const employerDto = { email: 'abc@gmail.com', password: '12345678' };

    const result = await service.login(employerDto);

    expect(mockJwtService.signAsync).toHaveBeenCalledWith({
      email: 'abc@gmail.com',
    });
    expect(result).toEqual({ accessToken: 'accessToken' });
  });
});
