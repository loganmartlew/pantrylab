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
import { Auth } from '../auth/decorators';
import { HouseholdBodyGuard, HouseholdQueryGuard } from '../households/guards';
import { HouseholdUserPolicy } from '../households/policies';
import { ListItemHouseholdUserPolicy } from './policies';

@Controller('listItems')
@ApiTags('listItems')
export class ListItemsController {
  private objectName = 'ListItem';

  constructor(private readonly listItemsService: ListItemsService) {}

  @Post()
  @Auth([HouseholdBodyGuard], HouseholdUserPolicy)
  @ApiCreatedResponse({ type: ListItemEntity })
  create(@Body() createListItemDto: ListItemDto) {
    return this.listItemsService.create(createListItemDto);
  }

  @Get()
  @Auth([HouseholdQueryGuard], HouseholdUserPolicy)
  @ApiCreatedResponse({ type: ListItemWithItemEntity, isArray: true })
  @ApiQuery({ name: 'householdId', required: true, type: String })
  findAll(@HouseholdId() householdId: string) {
    return this.listItemsService.findAllInHousehold(householdId);
  }

  @Get(':id')
  @Auth([], ListItemHouseholdUserPolicy)
  @ApiCreatedResponse({ type: ListItemWithItemEntity })
  async findOne(@Param('id') id: string) {
    const listItem = await this.listItemsService.findOne(id);

    if (!listItem) {
      throw new NotFoundException(`ListItem with id: ${id} not found`);
    }

    return listItem;
  }

  @Patch(':id')
  @Auth([], ListItemHouseholdUserPolicy)
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
  @Auth([], ListItemHouseholdUserPolicy)
  @ApiCreatedResponse({ type: ListItemEntity })
  async remove(@Param('id') id: string) {
    const listItem = await handleControllerMutation(
      () => this.listItemsService.remove(id),
      { id, objectName: this.objectName }
    );

    return listItem;
  }
}
