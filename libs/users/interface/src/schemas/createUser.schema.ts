import { User as UserPrisma } from '@prisma/client';
import { toZod } from 'tozod';
import { z } from 'zod';

type UserCreatePrisma = Omit<UserPrisma, 'id' | 'createdAt' | 'updatedAt'>;

export const userCreateSchema: toZod<UserCreatePrisma> = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  passwordHash: z.string(),
});

export type UserCreate = z.infer<typeof userCreateSchema>;