import { z } from 'zod'

import { Language } from '@admin/types/admin/type'

export const MAX_FILE_SIZE = import.meta.env.VITE_MAX_SIZE_AVATAR * 1024 * 1024
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

// export const UserInputSchema = z.object({
//   users: z
//     .array(
//       z.object({
//         id: z.string().optional(),
//         email: z.string().min(1, 'Email is required').email('Invalid email'),
//         first_name: z
//           .string()
//           .trim()
//           .min(1, 'First name is required')
//           .max(10, 'First name must be at most 10 characters'),
//         last_name: z.string().trim().min(1, 'Last name is required').max(10, 'Last name must be at most 10 characters'),
//         language: z.nativeEnum(Language),
//         uploads: z.any().refine((data) => data && data?.name, `Image required.`)
//       })
//     )
//     .refine((value) => {
//       const emailSet = new Set()
//       for (const item of value) {
//         if (item.email && emailSet.has(item.email)) {
//           return false
//         }
//         emailSet.add(item.email)
//       }

//       return true
//     }, 'Email cannot be duplicated')
// })

export const UserInputSchema = z.object({
  users: z
    .array(
      z.object({
        id: z.string().optional(),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        first_name: z
          .string()
          .trim()
          .min(1, 'First name is required')
          .max(30, 'First name must be at most 10 characters'),
        last_name: z.string().trim().min(1, 'Last name is required').max(30, 'Last name must be at most 10 characters'),
        language: z.nativeEnum(Language),
        uploads: z
          .object({
            id: z.string(),
            name: z.string(),
            status: z.boolean(),
            user_id: z.string().nullable()
          })
          .nullable()
      })
    )
    .refine((value) => {
      const emailSet = new Set()
      for (const item of value) {
        if (item.email && emailSet.has(item.email)) {
          return false
        }
        emailSet.add(item.email)
      }

      return true
    }, 'Email cannot be duplicated')
})

export type UserInput = z.infer<typeof UserInputSchema>['users'][number]
