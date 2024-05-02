import { z } from 'zod'

import { Language } from '@admin/types/admin/type'

export const ProfileInputSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  first_name: z.string().trim().min(1, 'First name is required').max(10, 'First name must be at most 10 characters'),
  last_name: z.string().trim().min(1, 'Last name is required').max(10, 'Last name must be at most 10 characters'),
  language: z.nativeEnum(Language),
  camera: z.boolean()
})

export type ProfileInput = z.infer<typeof ProfileInputSchema>
