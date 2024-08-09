import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Employer } from './schema/employer.schema';
import { EmployerDto } from './dto/employer.dto';

@Injectable()
export class EmployerService {
  constructor(
    @InjectModel(Employer.name) private readonly employerModel: Model<Employer>,
  ) {}

  async findEmployer(email: string): Promise<EmployerDto> {
    return await this.employerModel.findOne({ email });
  }

  async registerEmployer(email: string, password: string) {
    return await this.employerModel.create({ email, password });
  }
}
