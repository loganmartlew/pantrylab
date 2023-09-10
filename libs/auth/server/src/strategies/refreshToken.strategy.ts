import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { User } from '@pantrylab/users/interface';
import { Injectable } from '@nestjs/common';
import { serverConfig as config } from '@pantrylab/config';

export const REFRESH_TOKEN_KEY = 'refresh-token';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  REFRESH_TOKEN_KEY
) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => req.cookies?.refreshToken || null,
      secretOrKey: config.refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: User) {
    const refreshToken = req.cookies?.refreshToken || null;
    return {
      ...payload,
      refreshToken,
    };
  }
}
