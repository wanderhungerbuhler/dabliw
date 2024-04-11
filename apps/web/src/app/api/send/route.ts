'use server'

import { resend } from '@/lib/resend'

import { WelcomeEmail } from '../../../../emails/welcome'

export async function POST(req: Request) {
  if (req.method === 'POST') {
    const { name, email } = await req.json()
    try {
      const { data, error } = await resend.emails.send({
        from: 'Wander from Dabliw.com <wander@dabliw.com>',
        to: email,
        subject: 'Welcome to Dabliw.com',
        react: WelcomeEmail({
          name,
          email,
        }) as React.ReactElement,
      })

      if (error) {
        return Response.json({ error })
      }

      return Response.json(data)
    } catch (error) {
      return Response.json({ error })
    }
  }
}
