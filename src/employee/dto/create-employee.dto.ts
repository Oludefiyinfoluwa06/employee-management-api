import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import {
  BankAccountInformationDto,
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
  @Type(() => BankAccountInformationDto)
  bankAccountInformation: BankAccountInformationDto;

  @ValidateNested()
  @Type(() => NextOfKinInformationDto)
  nextOfKinInformation: NextOfKinInformationDto;
}
