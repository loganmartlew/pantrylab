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
import { InviteDto } from './dto';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { InviteEntity, InviteWithUserEntity } from './entities';
import { handleControllerMutation } from '@pantrylab/shared/util';
import {
  HouseholdId,
  HouseholdBodyGuard,
  HouseholdOwnerPolicy,
  HouseholdUserPolicy,
} from '@pantrylab/households/server';
import { Auth } from '@pantrylab/auth';
import { InviteUserPolicy } from './policies';

@Controller('invites')
@ApiTags('invites')
export class InvitesController {
  private objectName = 'Invite';

  constructor(private readonly invitesService: InvitesService) {}

  @Post()
  @Auth([HouseholdBodyGuard], HouseholdOwnerPolicy)
  @ApiCreatedResponse({ type: InviteEntity })
  create(@Body() createInviteDto: InviteDto) {
    return this.invitesService.create(createInviteDto);
  }

  @Get('householdinvites')
  @Auth([HouseholdBodyGuard], HouseholdUserPolicy)
  @ApiCreatedResponse({ type: InviteWithUserEntity, isArray: true })
  @ApiQuery({ name: 'householdId', required: true, type: String })
  findAllInHousehold(@HouseholdId() householdId: string) {
    return this.invitesService.findAllInHousehold(householdId);
  }

  @Patch(':id/accept')
  @Auth([], InviteUserPolicy)
  @ApiCreatedResponse({ type: InviteEntity })
  async accept(@Param('id') id: string) {
    const invite = await handleControllerMutation(
      () => this.invitesService.accept(id),
      { id, objectName: this.objectName }
    );

    return invite;
  }

  @Delete(':id')
  @Auth([], InviteUserPolicy)
  @ApiCreatedResponse({ type: InviteEntity })
  async remove(@Param('id') id: string) {
    const invite = await handleControllerMutation(
      () => this.invitesService.remove(id),
      { id, objectName: this.objectName }
    );

    return invite;
  }
}
