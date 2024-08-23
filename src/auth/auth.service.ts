import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './../types/index';
import { EmployerDto } from '../employer/dto/employer.dto';
import { EmployerService } from './../employer/employer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly employerService: EmployerService,
    private jwtService: JwtService,
  ) {}

  async validateEmployer(email: string, employerPassword: string) {
    const employer = await this.employerService.findEmployer(email);

    if (!employer) {
      throw new NotFoundException('Employer not found');
    }

    const isMatch: boolean = await bcrypt.compare(
      employerPassword,
      employer.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Password does not match');
    }

    const { password, ...result } = employer;
    return result;
  }

  async register(employerDto: EmployerDto): Promise<AuthResponse> {
    const employer = await this.employerService.findEmployer(employerDto.email);

    if (employer) {
      throw new ConflictException('Employer exists already');
    }

    const salt: string = await bcrypt.genSalt();
    const hashedPassword: string = await bcrypt.hash(
      employerDto.password,
      salt,
    );

    const employerInformation = await this.employerService.registerEmployer(
      employerDto.email,
      hashedPassword,
    );

    const payload = { id: employerInformation._id, email: employerDto.email };

    return {
      _id: employerInformation._id.toString(),
      email: employerInformation.email,
      message: 'Registration successful',
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async login(employerDto: EmployerDto): Promise<AuthResponse> {
    const employer = await this.employerService.findEmployer(employerDto.email);

    const payload = { id: employer._id, email: employerDto.email };

    return {
      _id: employer._id.toString(),
      email: employer.email,
      message: 'Login successful',
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
