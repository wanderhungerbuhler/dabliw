'use server'
import { cookies } from 'next/headers'

export async function Logout() {
  return cookies().delete('@dabliw:token')
}
