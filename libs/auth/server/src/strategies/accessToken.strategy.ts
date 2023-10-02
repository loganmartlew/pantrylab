import { serverConfig as config } from '@pantrylab/config/server';
import { User } from '@pantrylab/users/interface';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export const ACCESS_TOKEN_KEY = 'access-token';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  ACCESS_TOKEN_KEY,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.accessTokenSecret,
    });
  }

  async validate(payload: User) {
    return payload;
  }
}
