import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmployerDto } from './dto/employer.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() employerDto: EmployerDto) {
    return this.authService.register(employerDto);
  }

  @Post('login')
  login(@Body() employerDto: EmployerDto) {
    return this.authService.login(employerDto);
  }
}
