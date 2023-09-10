import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '@pantrylab/db';
import { HouseholdsService } from '@pantrylab/households/server';
import { ItemsService } from '@pantrylab/items/server';
import { ListItemCreate, ListItemUpdate } from '@pantrylab/listItems/interface';

@Injectable()
export class ListItemsService {
  constructor(
    private db: DbService,
    private householdsService: HouseholdsService,
    private itemsService: ItemsService
  ) {}

  async checkExists(id: string) {
    const listItem = await this.db.listItem.findUnique({
      where: { id },
    });
    return !!listItem;
  }

  async create(listItemDto: ListItemCreate) {
    if (!(await this.householdsService.checkExists(listItemDto.householdId))) {
      throw new NotFoundException(
        `Household with id: ${listItemDto.householdId} not found`
      );
    }

    const item = await this.itemsService.findOne(listItemDto.itemId);

    if (!item) {
      throw new NotFoundException(
        `Item with id: ${listItemDto.itemId} not found`
      );
    }

    if (item.householdId !== listItemDto.householdId) {
      throw new NotFoundException(
        `Item with id: ${listItemDto.itemId} not found in household with id: ${listItemDto.householdId}`
      );
    }

    const listItem = await this.db.listItem.create({
      data: listItemDto,
    });
    return listItem;
  }

  async findAll() {
    const listItems = await this.db.listItem.findMany();
    return listItems;
  }

  async findAllInHousehold(householdId: string) {
    const listItems = await this.db.listItem.findMany({
      where: { householdId },
      include: { item: true },
    });
    return listItems;
  }

  async findOne(id: string) {
    const listItem = await this.db.listItem.findUnique({
      where: { id },
      include: { item: true },
    });
    return listItem;
  }

  async update(id: string, updateListItemDto: ListItemUpdate) {
    const listItem = await this.db.listItem.update({
      where: { id },
      data: updateListItemDto,
    });
    return listItem;
  }

  async remove(id: string) {
    const listItem = await this.db.listItem.delete({
      where: { id },
    });
    return listItem;
  }
}
