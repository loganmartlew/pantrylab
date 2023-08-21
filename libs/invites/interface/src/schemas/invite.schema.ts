import { z } from 'zod';
import { toZod } from 'tozod';
import { Invite as InvitePrisma } from '@prisma/client';

export const inviteSchema: toZod<InvitePrisma> = z.object({
  id: z.string().uuid(),
  householdId: z.string().uuid(),
  userId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Invite = z.infer<typeof inviteSchema>;