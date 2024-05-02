import { z } from 'zod'

export const LoginInputSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(32, 'Password must be no more than 32 characters')
})

export type LoginInput = z.infer<typeof LoginInputSchema>
