import { z } from 'zod'

export const UserInformationInputSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  language: z.string()
})

export type UserInformationInput = z.infer<typeof UserInformationInputSchema>
