import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  password: z.string().min(8).max(100),
});

export type Signup = z.infer<typeof signupSchema>;
