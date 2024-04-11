'use client'

import { app } from '@/lib/axios'

export async function getBirthdayFn() {
  const response = await app.get('/listperson', {
    headers: {
      Content: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('@dabliw:token')}`,
    },
  })

  return response.data.person
}
