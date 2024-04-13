import { z } from 'zod'

export const PersonBodySchema = z.object({
  id: z.string().optional(),
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(3),
  gender: z
    .string({
      required_error: 'Gender is required',
    })
    .min(3, { message: 'Gender is required' }),
  birthdate: z.date({
    required_error: 'A date of birth is required.',
  }),
  maritalStatus: z
    .string({
      required_error: 'Marital status is required',
    })
    .min(3, { message: 'Marital status is required' }),
  address: z.array(
    z.object({
      id: z.string().optional(),
      personId: z.string().optional(),
      postalCode: z.string().min(8, { message: 'Postal code is required' }),
      address: z.string().min(3, { message: 'Address is required' }),
      number: z.string().min(1, { message: 'Number is required' }),
      district: z.string().min(1, { message: 'District is required' }),
      state: z.string().min(1, { message: 'State is required' }),
      city: z.string().min(1, { message: 'City is required' }),
    }),
  ),
})
