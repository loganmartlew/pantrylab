import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserUpdateDto } from './dto';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities';
import { handleControllerMutation } from '@pantrylab/shared/util';
import {
  HouseholdId,
  HouseholdQueryGuard,
  HouseholdUserPolicy,
} from '@pantrylab/households/server';
import { Auth } from '@pantrylab/auth';
import { UserSelfPolicy } from './policies';

@Controller('users')
@ApiTags('users')
export class UsersController {
  private objectName = 'User';

  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Auth([HouseholdQueryGuard], HouseholdUserPolicy)
  @ApiCreatedResponse({ type: UserEntity, isArray: true })
  @ApiQuery({ name: 'householdId', required: true, type: String })
  findAll(@HouseholdId() householdId: string) {
    return this.usersService.findAllInHousehold(householdId);
  }

  @Get(':id')
  @Auth([], UserSelfPolicy)
  @ApiCreatedResponse({ type: UserEntity })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return user;
  }

  @Patch(':id')
  @Auth([], UserSelfPolicy)
  @ApiCreatedResponse({ type: UserEntity })
  async update(@Param('id') id: string, @Body() updateUserDto: UserUpdateDto) {
    const user = await handleControllerMutation(
      () => this.usersService.update(id, updateUserDto),
      { id, objectName: this.objectName }
    );

    return user;
  }
}
