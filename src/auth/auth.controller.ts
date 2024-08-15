import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmployerDto } from '../employer/dto/employer.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() employerDto: EmployerDto) {
    return await this.authService.register(employerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() employerDto: EmployerDto) {
    return await this.authService.login(employerDto);
  }
}
