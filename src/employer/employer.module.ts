import { Module } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerController } from './employer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employer, EmployerSchema } from './schema/employer.schema';

@Module({
  controllers: [EmployerController],
  providers: [EmployerService],
  imports: [
    MongooseModule.forFeature([
      { name: Employer.name, schema: EmployerSchema },
    ]),
  ],
})
export class EmployerModule {}
