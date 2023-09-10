import { Invite as InvitePrisma } from '@prisma/client';
import { toZod } from 'tozod';
import { z } from 'zod';

type InviteCreatePrisma = Omit<InvitePrisma, 'id' | 'createdAt' | 'updatedAt'>;

export const inviteCreateSchema: toZod<InviteCreatePrisma> = z.object({
  householdId: z.string().uuid(),
  userId: z.string().uuid(),
});

export type InviteCreate = z.infer<typeof inviteCreateSchema>;
