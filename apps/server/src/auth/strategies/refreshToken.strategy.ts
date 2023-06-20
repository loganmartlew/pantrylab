import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UserEntity } from '../../users/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token'
) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => req.cookies?.refreshToken || null,
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: UserEntity) {
    const refreshToken = req.cookies?.refreshToken || null;
    return {
      ...payload,
      refreshToken,
    };
  }
}
