import { User } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export class UserEntity
  extends createZodDto(UserSchema)
  implements Omit<User, 'passwordHash'> {}
