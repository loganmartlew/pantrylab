import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const LoginDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export class LoginDto extends createZodDto(LoginDtoSchema) {}
