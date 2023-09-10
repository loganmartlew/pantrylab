import { z } from 'zod';
import { toZod } from 'tozod';
import { User as UserPrisma } from '@prisma/client';

export const userSchema: toZod<Omit<UserPrisma, 'passwordHash'>> = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof userSchema>;
