import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return 'login';
  }

  @Post('signup')
  signup(@Body() signpDto: SignupDto) {
    return 'signup';
  }

  @Post('logout')
  logout() {
    return 'logout';
  }

  @Get('refresh')
  refresh() {
    return 'refresh';
  }
}
