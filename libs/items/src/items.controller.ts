import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemDto, ItemUpdateDto } from './dto';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ItemEntity } from './entities';
import { handleControllerMutation } from '@pantrylab/shared/util';
import {
  HouseholdId,
  HouseholdBodyGuard,
  HouseholdQueryGuard,
  HouseholdUserPolicy,
} from '@pantrylab/households/server';
import { Search } from '@pantrylab/shared/decorators';
import { Auth } from '@pantrylab/auth';
import { ItemHouseholdUserPolicy } from './policies';

@Controller('items')
@ApiTags('items')
export class ItemsController {
  private objectName = 'Item';

  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @Auth([HouseholdBodyGuard], HouseholdUserPolicy)
  @ApiCreatedResponse({ type: ItemEntity })
  create(@Body() createItemDto: ItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @Auth([HouseholdQueryGuard], HouseholdUserPolicy)
  @ApiCreatedResponse({ type: ItemEntity, isArray: true })
  @ApiQuery({ name: 'householdId', required: true, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  findAll(@HouseholdId() householdId: string, @Search() search: string) {
    return this.itemsService.findAllInHousehold(householdId, search);
  }

  @Get(':id')
  @Auth([], ItemHouseholdUserPolicy)
  @ApiCreatedResponse({ type: ItemEntity })
  async findOne(@Param('id') id: string) {
    const item = await this.itemsService.findOne(id);

    if (!item) {
      throw new NotFoundException(`Item with id: ${id} not found`);
    }

    return item;
  }

  @Patch(':id')
  @Auth([], ItemHouseholdUserPolicy)
  @ApiCreatedResponse({ type: ItemEntity })
  async update(@Param('id') id: string, @Body() updateItemDto: ItemUpdateDto) {
    const item = await handleControllerMutation(
      () => this.itemsService.update(id, updateItemDto),
      { id, objectName: this.objectName }
    );

    return item;
  }

  @Delete(':id')
  @Auth([], ItemHouseholdUserPolicy)
  @ApiCreatedResponse({ type: ItemEntity })
  async remove(@Param('id') id: string) {
    const item = await handleControllerMutation(
      () => this.itemsService.remove(id),
      { id, objectName: this.objectName }
    );

    return item;
  }
}
