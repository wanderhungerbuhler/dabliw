'use server'
import { cookies } from 'next/headers'

import { app } from '@/lib/axios'

import { CreatePersonBodySchema } from '../components/create-birthday-person'

export async function createBirthdayMutation(data: CreatePersonBodySchema) {
  const response = await app.post('/person', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('@dabliw:token')?.value}`,
    },
  })

  return response.data
}
