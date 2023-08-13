import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto';
import { SignupDto } from './dto';
import { LoginEntity } from './entities';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { Cookies } from './decorators';
import { AuthService } from './auth.service';
import { AccessTokenGuard, RefreshTokenGuard } from './guards';
import { AuthUser } from './decorators';

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
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  async logout(
    @Cookies('refreshToken') refreshToken: string,
    @AuthUser('id') userId: string,
    @Res({ passthrough: true }) res: Response
  ) {
    res.clearCookie('refreshToken');
    await this.authService.logout(userId, refreshToken);
  }

  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  @ApiCookieAuth()
  @ApiCreatedResponse({ type: LoginEntity, isArray: true })
  async refresh(
    @Cookies('refreshToken') refreshToken: string,
    @AuthUser('id') userId: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const tokens = await this.authService.refresh(userId, refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {});

    return { accessToken: tokens.accessToken };
  }
}