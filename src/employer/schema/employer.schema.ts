import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmployerDocument = HydratedDocument<Employer>;

@Schema()
export class Employer {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const EmployerSchema = SchemaFactory.createForClass(Employer);
