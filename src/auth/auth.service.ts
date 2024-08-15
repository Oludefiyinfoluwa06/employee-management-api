import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from './../types/index';
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

  async register(employerDto: EmployerDto): Promise<AccessToken> {
    const employer = await this.employerService.findEmployer(employerDto.email);

    if (employer) {
      throw new ConflictException('Employer exists already');
    }

    const salt: string = await bcrypt.genSalt();
    const hashedPassword: string = await bcrypt.hash(
      employerDto.password,
      salt,
    );

    await this.employerService.registerEmployer(
      employerDto.email,
      hashedPassword,
    );

    return this.login(employerDto);
  }

  async login(employerDto: EmployerDto): Promise<AccessToken> {
    const payload = { email: employerDto.email };

    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
