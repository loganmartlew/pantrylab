import { Injectable } from '@nestjs/common';
import { UserDto, UserUpdateDto } from './dto/user.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  async create(userDto: UserDto) {
    const user = await this.db.user.create({
      data: userDto,
    });
    return user;
  }

  async findAll() {
    const users = await this.db.user.findMany();
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
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.db.user.findUnique({
      where: { id },
    });
    return user;
  }

  async update(id: string, updateUserDto: UserUpdateDto) {
    const user = await this.db.user.update({
      where: { id },
      data: updateUserDto,
    });
    return user;
  }

  async remove(id: string) {
    const user = await this.db.user.delete({
      where: { id },
    });
    return user;
  }
}
