import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  EducationalInformation,
  EmergencyContactInformation,
  EmploymentInformationDto,
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
  educational_information: EducationalInformation;

  @Prop({ type: Object, required: true })
  emergency_contact_information: EmergencyContactInformation;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
