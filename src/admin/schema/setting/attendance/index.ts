import { z } from 'zod'

export const AttendanceInputSchema = z.object({
  time: z.coerce.number().gte(0, 'Value ranges from 0 to 24').lte(23, 'Value ranges from 0 to 24'),
  status: z.boolean()
})

export type AttendanceInput = z.infer<typeof AttendanceInputSchema>
