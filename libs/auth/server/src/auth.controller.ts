import { authContract as c } from '@pantrylab/auth/interface';
import { Controller, Req, Res, UseGuards } from '@nestjs/common';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthUser, Cookies } from './decorators';
import { AccessTokenGuard, RefreshTokenGuard } from './guards';

@Controller()
@TsRest({ validateResponses: true })
export class AuthController {
  constructor(private authService: AuthService) {}

  @TsRestHandler(c.login)
  async login(
    @Cookies('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return tsRestHandler(c.login, async ({ body }) => {
      const tokens = await this.authService.login(body, refreshToken);

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
      });

      return {
        status: 200 as const,
        body: tokens,
      };
    });
  }

  @TsRestHandler(c.signup)
  async signup(
    @Cookies('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return tsRestHandler(c.signup, async ({ body }) => {
      const tokens = await this.authService.signup(body, refreshToken);

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
      });

      return {
        status: 201 as const,
        body: tokens,
      };
    });
  }

  @TsRestHandler(c.logout)
  // @UseGuards(AccessTokenGuard)
  async logout(
    @Cookies('refreshToken') refreshToken: string,
    // @AuthUser('id') userId: string,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    return tsRestHandler(c.logout, async () => {
      console.log(req.cookies);
      // res.clearCookie('refreshToken');
      // await this.authService.logout(userId, refreshToken);

      return { status: 200 as const, body: null };
    });
  }

  @TsRestHandler(c.refresh)
  @UseGuards(RefreshTokenGuard)
  async refresh(
    @Cookies('refreshToken') refreshToken: string,
    @AuthUser('id') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return tsRestHandler(c.refresh, async () => {
      const tokens = await this.authService.refresh(userId, refreshToken);

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
      });

      return {
        status: 200 as const,
        body: tokens,
      };
    });
  }
}
