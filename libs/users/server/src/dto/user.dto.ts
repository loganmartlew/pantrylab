import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const UserDtoSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  passwordHash: z.string(),
});

export const UserUpdateSchema = z
  .object({
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
  })
  .partial();

export class UserDto extends createZodDto(UserDtoSchema) {}
export class UserUpdateDto extends createZodDto(UserUpdateSchema) {}
