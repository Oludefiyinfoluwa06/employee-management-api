import { Controller } from '@nestjs/common';
import { EmployerService } from './employer.service';

@Controller('employer')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}
}
