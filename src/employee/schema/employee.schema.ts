import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  bankAccountInformationDto,
  EmploymentInformationDto,
  NextOfKinInformationDto,
  PersonalInformationDto,
} from '../dto/employee-information.dto';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
  @Prop({ type: Object, required: true })
  personal_information: PersonalInformationDto;

  @Prop({ type: Object, required: true })
  employment_information: EmploymentInformationDto;

  @Prop({ type: Object, required: true })
  bank_account_information: bankAccountInformationDto;

  @Prop({ type: Object, required: true })
  next_of_kin_information: NextOfKinInformationDto;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
