import { User as UserPrisma } from '@prisma/client';
import { toZod } from 'tozod';
import { z } from 'zod';

type UserUpdatePrisma = Omit<
  UserPrisma,
  'id' | 'email' | 'passwordHash' | 'createdAt' | 'updatedAt'
>;

export const userUpdateSchema: toZod<Partial<UserUpdatePrisma>> = z
  .object({
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
  })
  .partial();

export type UserUpdate = z.infer<typeof userUpdateSchema>;
