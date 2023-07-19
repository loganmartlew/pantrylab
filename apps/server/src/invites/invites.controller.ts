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
import { Auth } from '../auth/decorators';
import { HouseholdBodyGuard } from '../households/guards';
import {
  HouseholdOwnerPolicy,
  HouseholdUserPolicy,
} from '../households/policies';
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
