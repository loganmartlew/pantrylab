import { DbService } from '@pantrylab/db';
import {
  HouseholdCreate,
  HouseholdUpdate,
} from '@pantrylab/households/interface';
import { Injectable } from '@nestjs/common';
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

  async create(householdDto: HouseholdCreate) {
    const household = await this.db.household.create({
      data: householdDto,
    });
    return household;
  }

  async findAll() {
    const households = await this.db.household.findMany();
    return households;
  }

  async findAllByUserId(userId: string) {
    const households = await this.db.household.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
    });
    return households;
  }

  async findOne(id: string) {
    const household = await this.db.household.findUnique({
      where: { id },
    });
    return household;
  }

  async update(id: string, updateHouseholdDto: HouseholdUpdate) {
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
    role?: HouseholdUserRole,
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

  async addUser(userId: string, householdId: string) {
    await this.db.householdUser.create({
      data: {
        role: 'OWNER',
        userId,
        householdId,
      },
    });
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
