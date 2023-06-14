import { Invite } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const InviteSchema = z.object({
  id: z.string().uuid(),
  householdId: z.string().uuid(),
  userId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export class InviteEntity
  extends createZodDto(InviteSchema)
  implements Invite {}
