import { AuthGuard } from '@nestjs/passport';
import { REFRESH_TOKEN_KEY } from '../strategies';

export class AccessTokenGuard extends AuthGuard(REFRESH_TOKEN_KEY) {
  constructor() {
    super();
  }
}
