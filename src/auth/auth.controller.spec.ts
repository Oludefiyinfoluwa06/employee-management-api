import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    register: jest.fn((dto) => {
      return {
        _id: 'employerId',
        email: dto.email,
      };
    }),
    login: jest.fn((dto) => {
      return {
        _id: 'employerId',
        email: dto.email,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register employer', async () => {
    const dto = { email: 'abc@gmail.com', password: '12345678' };

    expect(await controller.register(dto)).toEqual({
      _id: expect.any(String),
      email: dto.email,
    });

    expect(mockAuthService.register).toHaveBeenCalledWith({
      email: dto.email,
      password: dto.password,
    });
  });

  it('should log employer in', async () => {
    const dto = { email: 'abc@gmail.com', password: '12345678' };

    expect(await controller.login(dto)).toEqual({
      _id: expect.any(String),
      email: dto.email,
    });

    expect(mockAuthService.login).toHaveBeenCalledWith({
      email: dto.email,
      password: dto.password,
    });
  });
});
