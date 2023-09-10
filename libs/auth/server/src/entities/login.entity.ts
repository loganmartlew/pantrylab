import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const LoginSchema = z.object({
  accessToken: z.string(),
});

export class LoginEntity extends createZodDto(LoginSchema) {}
