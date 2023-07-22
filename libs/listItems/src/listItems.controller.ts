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
import { ListItemDto, ListItemUpdateDto } from './dto';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ListItemEntity, ListItemWithItemEntity } from './entities';
import { handleControllerMutation } from '@pantrylab/shared/util';
import { HouseholdId } from '@pantrylab/households';
import { Auth } from '@pantrylab/auth';
import { HouseholdBodyGuard, HouseholdQueryGuard } from '@pantrylab/households';
import { HouseholdUserPolicy } from '@pantrylab/households';
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
