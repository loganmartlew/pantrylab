import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InviteDto } from './dto/invite.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { InviteEntity } from './entities/invite.entity';
import { PrismaClientExceptionFilter } from '../filters/prisma-client-exception.filter';
import handleControllerMutation from '../util/handleControllerMutation';
import { HouseholdId } from '../decorators/householdId.decorator';

@Controller('invites')
@ApiTags('invites')
@UseFilters(PrismaClientExceptionFilter)
export class InvitesController {
  private objectName = 'Invite';

  constructor(private readonly invitesService: InvitesService) {}

  @Post()
  @ApiCreatedResponse({ type: InviteEntity })
  create(@Body() createInviteDto: InviteDto) {
    return this.invitesService.create(createInviteDto);
  }

  @Get('householdinvites')
  @ApiCreatedResponse({ type: InviteEntity, isArray: true })
  findAllInHousehold(@HouseholdId() householdId: string) {
    return this.invitesService.findAllInHousehold(householdId);
  }

  @Patch(':id/accept')
  @ApiCreatedResponse({ type: InviteEntity })
  async accept(@Param('id') id: string) {
    const invite = await handleControllerMutation(
      () => this.invitesService.accept(id),
      { id, objectName: this.objectName }
    );

    return invite;
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: InviteEntity })
  async remove(@Param('id') id: string) {
    const invite = await handleControllerMutation(
      () => this.invitesService.remove(id),
      { id, objectName: this.objectName }
    );

    return invite;
  }
}
