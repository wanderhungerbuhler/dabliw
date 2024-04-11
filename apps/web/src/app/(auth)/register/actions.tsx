// import { app } from '@/lib/axios'
'use server'

import { app } from '@/lib/axios'

type SendEmailRegisterProps = {
  name: string
  email: string
}

export async function SendEmailRegister(data: SendEmailRegisterProps) {
  await app.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/send`, data)
}
