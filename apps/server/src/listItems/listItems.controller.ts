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
import { ListItemsService } from './listItems.service';
import { ListItemDto, ListItemUpdateDto } from './dto/listItem.dto';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  ListItemEntity,
  ListItemWithItemEntity,
} from './entities/listItem.entity';
import handleControllerMutation from '../util/handleControllerMutation';
import { HouseholdId } from '../decorators/householdId.decorator';

@Controller('listItems')
@ApiTags('listItems')
export class ListItemsController {
  private objectName = 'ListItem';

  constructor(private readonly listItemsService: ListItemsService) {}

  @Post()
  @ApiCreatedResponse({ type: ListItemEntity })
  create(@Body() createListItemDto: ListItemDto) {
    return this.listItemsService.create(createListItemDto);
  }

  @Get()
  @ApiCreatedResponse({ type: ListItemWithItemEntity, isArray: true })
  @ApiQuery({ name: 'householdId', required: true, type: String })
  findAll(@HouseholdId() householdId: string) {
    return this.listItemsService.findAllInHousehold(householdId);
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ListItemWithItemEntity })
  async findOne(@Param('id') id: string) {
    const listItem = await this.listItemsService.findOne(id);

    if (!listItem) {
      throw new NotFoundException(`ListItem with id: ${id} not found`);
    }

    return listItem;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ListItemEntity })
  async update(
    @Param('id') id: string,
    @Body() updateListItemDto: ListItemUpdateDto
  ) {
    const listItem = await handleControllerMutation(
      () => this.listItemsService.update(id, updateListItemDto),
      { id, objectName: this.objectName }
    );

    return listItem;
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ListItemEntity })
  async remove(@Param('id') id: string) {
    const listItem = await handleControllerMutation(
      () => this.listItemsService.remove(id),
      { id, objectName: this.objectName }
    );

    return listItem;
  }
}
