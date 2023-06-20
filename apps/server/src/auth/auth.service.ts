import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private db: DbService, private jwtService: JwtService) {}

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

    return await this.getTokens(user);
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async getTokens(user: UserEntity) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(user, {
        expiresIn: 60 * 60, // 1 hour
        secret: process.env.ACCESS_TOKEN_SECRET,
      }),
      this.jwtService.signAsync(user, {
        expiresIn: 60 * 60 * 24 * 7, // 1 week
        secret: process.env.REFRESH_TOKEN_SECRET,
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
