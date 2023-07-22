import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from '@pantrylab/users';
import { Injectable } from '@nestjs/common';
import { serverConfig as config } from '@pantrylab/config';

export const ACCESS_TOKEN_KEY = 'access-token';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  ACCESS_TOKEN_KEY
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.accessTokenSecret,
    });
  }

  async validate(payload: UserEntity) {
    return payload;
  }
}
