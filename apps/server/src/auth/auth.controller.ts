import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { LoginEntity } from './entities/login.entity';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  @Post('login')
  @ApiCreatedResponse({ type: LoginEntity, isArray: true })
  login(@Body() loginDto: LoginDto) {
    return 'login';
  }

  @Post('signup')
  @ApiCreatedResponse({ type: LoginEntity, isArray: true })
  signup(@Body() signpDto: SignupDto) {
    return 'signup';
  }

  @Post('logout')
  logout() {
    return 'logout';
  }

  @Get('refresh')
  @ApiCreatedResponse({ type: LoginEntity, isArray: true })
  refresh() {
    return 'refresh';
  }
}
