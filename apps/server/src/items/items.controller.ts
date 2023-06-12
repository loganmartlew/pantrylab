import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseFilters,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemDto, ItemUpdateDto } from './dto/item.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ItemEntity } from './entities/item.entity';
import { PrismaClientExceptionFilter } from '../filters/prisma-client-exception.filter';
import handleControllerMutation from '../util/handleControllerMutation';
import { HouseholdId } from '../decorators/householdId.decorator';
import { Search } from '../decorators/search.decorator';

@Controller('items')
@ApiTags('items')
@UseFilters(PrismaClientExceptionFilter)
export class ItemsController {
  private objectName = 'Item';

  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiCreatedResponse({ type: ItemEntity })
  create(@Body() createItemDto: ItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @ApiCreatedResponse({ type: ItemEntity, isArray: true })
  findAll(@HouseholdId() householdId: string, @Search() search: string) {
    return this.itemsService.findAllInHousehold(householdId, search);
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ItemEntity })
  async findOne(@Param('id') id: string) {
    const item = await this.itemsService.findOne(id);

    if (!item) {
      throw new NotFoundException(`Item with id: ${id} not found`);
    }

    return item;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ItemEntity })
  async update(@Param('id') id: string, @Body() updateItemDto: ItemUpdateDto) {
    const item = await handleControllerMutation(
      () => this.itemsService.update(id, updateItemDto),
      { id, objectName: this.objectName }
    );

    return item;
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ItemEntity })
  async remove(@Param('id') id: string) {
    const item = await handleControllerMutation(
      () => this.itemsService.remove(id),
      { id, objectName: this.objectName }
    );

    return item;
  }
}
