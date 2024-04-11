'use server'
import { cookies } from 'next/headers'

import { app } from '@/lib/axios'

import { PersonProps } from '../components/types'

export async function deleteBirthdayMutation(person: PersonProps) {
  const response = await app.delete(`/person/${person.id}`, {
    headers: {
      Content: 'application/json',
      Authorization: `Bearer ${cookies().get('@dabliw:token')?.value}`,
    },
  })

  return response.data
}
