import { AuthGuard } from '@nestjs/passport';
import { REFRESH_TOKEN_KEY } from '../strategies';

export class RefreshTokenGuard extends AuthGuard(REFRESH_TOKEN_KEY) {
  constructor() {
    super();
  }
}
