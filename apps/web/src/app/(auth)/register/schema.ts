import { z } from 'zod'

export const validationRegisterSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(3),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email(),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(7),
})
