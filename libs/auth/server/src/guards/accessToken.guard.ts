import { AuthGuard } from '@nestjs/passport';
import { ACCESS_TOKEN_KEY } from '../strategies';

export class AccessTokenGuard extends AuthGuard(ACCESS_TOKEN_KEY) {
  constructor() {
    super();
  }
}
