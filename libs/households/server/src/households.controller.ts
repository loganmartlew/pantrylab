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
import { HouseholdDto, HouseholdUpdateDto } from './dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { HouseholdEntity } from './entities';
import { handleControllerMutation } from '@pantrylab/shared/util';
import { Auth } from '@pantrylab/auth';
import { AuthUser } from '@pantrylab/auth';
import { HouseholdParamGuard } from './guards';
import { HouseholdOwnerPolicy, HouseholdUserPolicy } from './policies';

@Controller('households')
@ApiTags('households')
export class HouseholdsController {
  private objectName = 'Household';

  constructor(private readonly householdsService: HouseholdsService) {}

  @Post()
  @Auth()
  @ApiCreatedResponse({ type: HouseholdEntity })
  create(@Body() createHouseholdDto: HouseholdDto) {
    return this.householdsService.create(createHouseholdDto);
  }

  @Get()
  @Auth()
  @ApiCreatedResponse({ type: HouseholdEntity, isArray: true })
  findAll(@AuthUser('id') userId: string) {
    return this.householdsService.findAllByUserId(userId);
  }

  @Get(':id')
  @Auth([HouseholdParamGuard], HouseholdUserPolicy)
  @ApiCreatedResponse({ type: HouseholdEntity })
  async findOne(@Param('id') id: string) {
    const household = await this.householdsService.findOne(id);

    if (!household) {
      throw new NotFoundException(`Household with id: ${id} not found`);
    }

    return household;
  }

  @Patch(':id')
  @Auth([HouseholdParamGuard], HouseholdOwnerPolicy)
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
  @Auth([HouseholdParamGuard], HouseholdOwnerPolicy)
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
  @Auth([HouseholdParamGuard], HouseholdOwnerPolicy)
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
