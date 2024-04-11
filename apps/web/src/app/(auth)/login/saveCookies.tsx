'use server'
import { cookies } from 'next/headers'

export async function SaveCookies(token: string, user: string) {
  cookies().set('@dabliw:token', token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  })

  cookies().set('@dabliw:user', JSON.stringify(user), {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  })
}
