'use server'
import { cookies } from 'next/headers'

import { app } from '@/lib/axios'

import { UpdatePersonBodySchema } from '../components/update-birthday-person'

export async function updateBirthdayMutation(data: UpdatePersonBodySchema) {
  const response = await app.post('/person', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('@dabliw:token')?.value}`,
    },
  })

  return response.data
}
