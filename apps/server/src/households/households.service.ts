import { Injectable } from '@nestjs/common';
import { HouseholdDto, HouseholdUpdateDto } from './dto/household.dto';
import { DbService } from '../db/db.service';
import { HouseholdUserRole } from '@prisma/client';

@Injectable()
export class HouseholdsService {
  constructor(private db: DbService) {}

  async checkExists(id: string) {
    const household = await this.db.household.findUnique({
      where: { id },
    });
    return !!household;
  }

  async create(householdDto: HouseholdDto) {
    const household = await this.db.household.create({
      data: householdDto,
    });
    return household;
  }

  async findAll() {
    const households = await this.db.household.findMany();
    return households;
  }

  async findOne(id: string) {
    const household = await this.db.household.findUnique({
      where: { id },
    });
    return household;
  }

  async update(id: string, updateHouseholdDto: HouseholdUpdateDto) {
    const household = await this.db.household.update({
      where: { id },
      data: updateHouseholdDto,
    });
    return household;
  }

  async remove(id: string) {
    const household = await this.db.household.delete({
      where: { id },
    });
    return household;
  }

  async checkUserInHousehold(
    userId: string,
    householdId: string,
    role?: HouseholdUserRole
  ) {
    const householdUser = await this.db.householdUser.findUnique({
      where: {
        householdId_userId: {
          householdId,
          userId,
        },
      },
    });

    // User is not in the household
    if (!householdUser) {
      return false;
    }

    // User in household (ignore role)
    if (!role) {
      return true;
    }

    return householdUser.role === role;
  }

  async removeUser(userId: string, householdId: string) {
    await this.db.householdUser.delete({
      where: {
        householdId_userId: {
          householdId,
          userId,
        },
      },
    });
  }
}
