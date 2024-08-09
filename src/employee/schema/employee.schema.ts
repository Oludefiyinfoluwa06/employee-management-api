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
  personalInformation: PersonalInformationDto;

  @Prop({ type: Object, required: true })
  employmentInformation: EmploymentInformationDto;

  @Prop({ type: Object, required: true })
  bankAccountInformation: bankAccountInformationDto;

  @Prop({ type: Object, required: true })
  nextOfKinInformation: NextOfKinInformationDto;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
