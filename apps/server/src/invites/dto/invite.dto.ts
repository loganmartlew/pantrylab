import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const InviteDtoSchema = z.object({
  householdId: z.string().uuid(),
  userId: z.string().uuid(),
});

export class InviteDto extends createZodDto(InviteDtoSchema) {}
