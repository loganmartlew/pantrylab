import { Injectable } from '@nestjs/common';
import { HouseholdDto, HouseholdUpdateDto } from './dto/household.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class HouseholdsService {
  constructor(private db: DbService) {}

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
}