import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender } from './../../utils/constants';
import { HydratedDocument } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  gender: Gender;

  @Prop({ required: true })
  physicalAddress: string;

  @Prop({ required: true })
  emailAddress: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true })
  emergencyPhoneNumber: string;

  @Prop({ required: true })
  educationalLevel: string;

  @Prop({ required: true })
  employmentRole: string;

  @Prop({ required: true })
  employmentStartDate: Date;

  @Prop({ required: true })
  bankName: string;

  @Prop({ required: true })
  bankAccountNumber: number;

  @Prop({ required: true })
  accountName: string;

  @Prop({ required: true })
  nextOfKinFullName: string;

  @Prop({ required: true })
  nextOfKinPhoneNumber: string;

  @Prop({ required: true })
  nextOfKinRelationship: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
