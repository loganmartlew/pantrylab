import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DbService } from '../db/db.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '@pantrylab/users';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private db: DbService, private jwtService: JwtService) {}

  async checkEmailExists(email: string) {
    const user = await this.db.user.findUnique({
      where: { email },
    });
    return !!user;
  }

  async signup(signupDto: SignupDto, refreshToken: string) {
    if (await this.checkEmailExists(signupDto.email))
      throw new ConflictException(
        `User with email: ${signupDto.email} already exists`
      );

    const passwordHash = await this.hashPassword(signupDto.password);

    const user = await this.db.user.create({
      data: {
        email: signupDto.email,
        firstName: signupDto.firstName,
        lastName: signupDto.lastName,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
        passwordHash: false,
      },
    });

    const tokens = await this.getTokens(user);

    await this.saveRefreshToken(user.id, tokens.refreshToken);

    if (refreshToken) {
      await this.removeRefreshToken(user.id, refreshToken);
    }

    return tokens;
  }

  async login(loginDto: LoginDto, refreshToken: string) {
    const user = await this.db.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) throw new ForbiddenException('Invalid credentials');

    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      user.passwordHash
    );
    if (!passwordMatches) throw new ForbiddenException('Invalid credentials');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...sanitizedUser } = user;

    const tokens = await this.getTokens(sanitizedUser);

    await this.saveRefreshToken(user.id, tokens.refreshToken);

    if (refreshToken) {
      await this.removeRefreshToken(user.id, refreshToken);
    }

    return tokens;
  }

  async logout(userId: string, refreshToken: string) {
    await this.removeRefreshToken(userId, refreshToken);
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new ForbiddenException('Invalid credentials');

    const refreshTokenMatches = await this.db.refreshToken.findFirst({
      where: {
        userId,
        tokenHash: this.hashToken(refreshToken),
      },
    });
    if (!refreshTokenMatches)
      throw new ForbiddenException('Invalid credentials');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...sanitizedUser } = user;

    const tokens = await this.getTokens(sanitizedUser);

    await this.saveRefreshToken(user.id, tokens.refreshToken);

    if (refreshToken) {
      await this.removeRefreshToken(user.id, refreshToken);
    }

    return tokens;
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    await this.db.refreshToken.create({
      data: {
        userId,
        tokenHash: this.hashToken(refreshToken),
      },
    });
  }

  async removeRefreshToken(userId: string, refreshToken: string) {
    await this.db.refreshToken.deleteMany({
      where: {
        userId,
        tokenHash: this.hashToken(refreshToken),
      },
    });
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  hashToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
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
