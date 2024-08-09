import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import {
  bankAccountInformationDto,
  EmploymentInformationDto,
  NextOfKinInformationDto,
  PersonalInformationDto,
} from './employee-information.dto';

export class CreateEmployeeDto {
  @ValidateNested()
  @Type(() => PersonalInformationDto)
  personalInformation: PersonalInformationDto;

  @ValidateNested()
  @Type(() => EmploymentInformationDto)
  employmentInformation: EmploymentInformationDto;

  @ValidateNested()
  @Type(() => bankAccountInformationDto)
  bankAccountInformation: bankAccountInformationDto;

  @ValidateNested()
  @Type(() => NextOfKinInformationDto)
  nextOfKinInformation: NextOfKinInformationDto;
}
