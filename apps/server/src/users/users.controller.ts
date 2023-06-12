import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  NotFoundException,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserUpdateDto } from './dto/user.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { PrismaClientExceptionFilter } from '../filters/prisma-client-exception.filter';

@Controller('users')
@ApiTags('users')
@UseFilters(PrismaClientExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiCreatedResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: UserEntity })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return user;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: UserEntity })
  update(@Param('id') id: string, @Body() updateUserDto: UserUpdateDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
