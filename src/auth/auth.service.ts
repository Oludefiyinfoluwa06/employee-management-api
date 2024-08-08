import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EmployerDto } from './dto/employer.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Employer } from './schema/employer.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Employer.name) private readonly employerModel: Model<Employer>,
    private jwtService: JwtService,
  ) {}
  async register(employerDto: EmployerDto): Promise<AccessToken> {
    const existingEmployer = await this.employerModel.findOne({
      email: employerDto.email,
    });

    if (existingEmployer) {
      throw new ConflictException('Employer already exists');
    }

    const salt: string = await bcrypt.genSalt();
    const hash: string = await bcrypt.hash(employerDto.password, salt);
    await this.employerModel.create({
      ...employerDto,
      password: hash,
    });
    return this.login(employerDto);
  }

  async login(employerDto: EmployerDto): Promise<AccessToken> {
    const employer = await this.employerModel.findOne({
      email: employerDto.email,
    });

    if (!employer) {
      throw new NotFoundException('Email does not exist');
    }

    const match = await bcrypt.compare(employerDto.password, employer.password);

    if (!match) {
      throw new UnauthorizedException('Incorrect password');
    }

    const payload = { id: employer._id };

    return { access_token: await this.jwtService.sign(payload) };
  }
}
