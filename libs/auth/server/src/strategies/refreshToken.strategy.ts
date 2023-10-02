import { serverConfig as config } from '@pantrylab/config';
import { User } from '@pantrylab/users/interface';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

export const REFRESH_TOKEN_KEY = 'refresh-token';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  REFRESH_TOKEN_KEY,
) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) =>
        req.cookies?.refreshToken || req.query?.refreshToken || null,
      secretOrKey: config.refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: User) {
    const refreshToken =
      req.cookies?.refreshToken || req.query?.refreshToken || null;
    return {
      ...payload,
      refreshToken,
    };
  }
}
