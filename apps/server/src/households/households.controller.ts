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
import { HouseholdsService } from './households.service';
import { HouseholdDto, HouseholdUpdateDto } from './dto/household.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { HouseholdEntity } from './entities/household.entity';
import handleControllerMutation from '../util/handleControllerMutation';

@Controller('households')
@ApiTags('households')
export class HouseholdsController {
  private objectName = 'Household';

  constructor(private readonly householdsService: HouseholdsService) {}

  @Post()
  @ApiCreatedResponse({ type: HouseholdEntity })
  create(@Body() createHouseholdDto: HouseholdDto) {
    return this.householdsService.create(createHouseholdDto);
  }

  @Get()
  @ApiCreatedResponse({ type: HouseholdEntity, isArray: true })
  findAll() {
    return this.householdsService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: HouseholdEntity })
  async findOne(@Param('id') id: string) {
    const household = await this.householdsService.findOne(id);

    if (!household) {
      throw new NotFoundException(`Household with id: ${id} not found`);
    }

    return household;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: HouseholdEntity })
  async update(
    @Param('id') id: string,
    @Body() updateHouseholdDto: HouseholdUpdateDto
  ) {
    const household = await handleControllerMutation(
      () => this.householdsService.update(id, updateHouseholdDto),
      {
        id,
        objectName: this.objectName,
      }
    );

    return household;
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: HouseholdEntity })
  async remove(@Param('id') id: string) {
    const household = await handleControllerMutation(
      () => this.householdsService.remove(id),
      {
        id,
        objectName: this.objectName,
      }
    );

    return household;
  }

  @Delete(':id/user/:userId')
  async removeUser(@Param('id') id: string, @Param('userId') userId: string) {
    await handleControllerMutation(
      () => this.householdsService.removeUser(id, userId),
      {
        id,
        objectName: this.objectName,
      }
    );
  }
}
