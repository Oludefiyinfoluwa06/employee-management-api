import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import {
  EducationalInformation,
  EmergencyContactInformation,
  EmploymentInformationDto,
  PersonalInformationDto,
} from './employee-information.dto';

export class CreateEmployeeDto {
  @ValidateNested()
  @Type(() => PersonalInformationDto)
  personal_information: PersonalInformationDto;

  @ValidateNested()
  @Type(() => EmploymentInformationDto)
  employment_information: EmploymentInformationDto;

  @ValidateNested()
  @Type(() => EducationalInformation)
  educational_information: EducationalInformation;

  @ValidateNested()
  @Type(() => EmergencyContactInformation)
  emergency_contact_information: EmergencyContactInformation;
}
