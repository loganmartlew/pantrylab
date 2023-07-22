import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const SignupDtoSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  password: z.string().min(8).max(100),
});

export class SignupDto extends createZodDto(SignupDtoSchema) {}
