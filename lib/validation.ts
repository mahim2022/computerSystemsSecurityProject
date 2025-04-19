// lib/validation.ts
import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(100, { message: 'Password too long' }),
  captcha: z.string().min(1, { message: 'CAPTCHA is required' }),
})
