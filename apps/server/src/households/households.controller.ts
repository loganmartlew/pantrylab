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
import { HouseholdsService } from './households.service';
import { HouseholdDto, HouseholdUpdateDto } from './dto/household.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { HouseholdEntity } from './entities/household.entity';
import { PrismaClientExceptionFilter } from '../filters/prisma-client-exception.filter';

@Controller('households')
@ApiTags('households')
@UseFilters(PrismaClientExceptionFilter)
export class HouseholdsController {
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
  update(
    @Param('id') id: string,
    @Body() updateHouseholdDto: HouseholdUpdateDto
  ) {
    return this.householdsService.update(id, updateHouseholdDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: HouseholdEntity })
  remove(@Param('id') id: string) {
    return this.householdsService.remove(id);
  }
}
