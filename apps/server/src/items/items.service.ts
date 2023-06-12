import { Injectable } from '@nestjs/common';
import { ItemDto, ItemUpdateDto } from './dto/item.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class ItemsService {
  constructor(private db: DbService) {}

  async create(itemDto: ItemDto) {
    const item = await this.db.item.create({
      data: itemDto,
    });
    return item;
  }

  async findAll() {
    const items = await this.db.item.findMany();
    return items;
  }

  async findAllInHousehold(householdId: string, search = '') {
    const items = await this.db.item.findMany({
      where: { householdId, name: { contains: search, mode: 'insensitive' } },
    });
    return items;
  }

  async findOne(id: string) {
    const item = await this.db.item.findUnique({
      where: { id },
    });
    return item;
  }

  async update(id: string, updateItemDto: ItemUpdateDto) {
    const item = await this.db.item.update({
      where: { id },
      data: updateItemDto,
    });
    return item;
  }

  async remove(id: string) {
    const item = await this.db.item.delete({
      where: { id },
    });
    return item;
  }
}
