import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InviteDto } from './dto/invite.dto';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { InviteEntity, InviteWithUserEntity } from './entities/invite.entity';
import handleControllerMutation from '../util/handleControllerMutation';
import { HouseholdId } from '../decorators/householdId.decorator';

@Controller('invites')
@ApiTags('invites')
export class InvitesController {
  private objectName = 'Invite';

  constructor(private readonly invitesService: InvitesService) {}

  @Post()
  @ApiCreatedResponse({ type: InviteEntity })
  create(@Body() createInviteDto: InviteDto) {
    return this.invitesService.create(createInviteDto);
  }

  @Get('householdinvites')
  @ApiCreatedResponse({ type: InviteWithUserEntity, isArray: true })
  @ApiQuery({ name: 'householdId', required: true, type: String })
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
