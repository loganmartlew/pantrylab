import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { LoginEntity } from './entities/login.entity';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { Cookies } from '../decorators/cookies.decorator';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: LoginEntity, isArray: true })
  async login(
    @Body() loginDto: LoginDto,
    @Cookies('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const tokens = await this.authService.login(loginDto, refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {});

    return { accessToken: tokens.accessToken };
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: LoginEntity, isArray: true })
  async signup(
    @Body() signpDto: SignupDto,
    @Cookies('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const tokens = await this.authService.signup(signpDto, refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {});

    return { accessToken: tokens.accessToken };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('access-token'))
  async logout(
    @Cookies('refreshToken') refreshToken: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const user = req.user as any;

    console.log(user);

    res.clearCookie('refreshToken');
    await this.authService.logout(user!['id'], refreshToken);
  }

  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('refresh-token'))
  @ApiCreatedResponse({ type: LoginEntity, isArray: true })
  async refresh(
    @Cookies('refreshToken') refreshToken: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const user = req.user as any;

    const tokens = await this.authService.refresh(user!['id'], refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {});

    return { accessToken: tokens.accessToken };
  }
}
