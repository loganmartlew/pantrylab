import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private db: DbService) {}

  async signup(signupDto: SignupDto) {
    const passwordHash = await this.hashPassword(signupDto.password);

    const user = await this.db.user.create({
      data: {
        email: signupDto.email,
        firstName: signupDto.firstName,
        lastName: signupDto.lastName,
        passwordHash,
      },
    });
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
