import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserUpdateDto } from './dto/user.dto';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import handleControllerMutation from '../util/handleControllerMutation';
import { HouseholdId } from '../decorators/householdId.decorator';
import { Auth } from '../auth/decorators';
import { HouseholdQueryGuard } from '../households/guards';
import { HouseholdUserPolicy } from '../households/policies';
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
