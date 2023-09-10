import { Injectable } from '@nestjs/common';
import { UserDto, UserUpdateDto } from './dto';
import { DbService } from '@pantrylab/db';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  async checkExists(id: string) {
    const user = await this.db.user.findUnique({
      where: { id },
    });
    return !!user;
  }

  async create(userDto: UserDto) {
    const user = await this.db.user.create({
      data: userDto,
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
    return user;
  }

  async findAll() {
    const users = await this.db.user.findMany({
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
    return users;
  }

  async findAllInHousehold(householdId: string) {
    const users = await this.db.user.findMany({
      where: {
        households: {
          some: {
            householdId,
          },
        },
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
    return users;
  }

  async findOne(id: string) {
    const user = await this.db.user.findUnique({
      where: { id },
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
    return user;
  }

  async update(id: string, updateUserDto: UserUpdateDto) {
    const user = await this.db.user.update({
      where: { id },
      data: updateUserDto,
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
    return user;
  }

  async remove(id: string) {
    const user = await this.db.user.delete({
      where: { id },
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
    return user;
  }
}
