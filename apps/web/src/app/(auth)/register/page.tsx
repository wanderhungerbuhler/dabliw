/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { app } from '@/lib/axios'

import DabliwAnimationGIF from '../../../../public/dabliw-animation.gif'
import { SendEmailRegister } from './actions'
import { validationRegisterSchema } from './schema'

type ValidationRegisterSchema = z.infer<typeof validationRegisterSchema>

export default function LoginPage() {
  const router = useRouter()

  const form = useForm<ValidationRegisterSchema>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(validationRegisterSchema),
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await app.post('/account', data)

      if (response.status === 201) {
        await SendEmailRegister(data)
        // await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send`, {
        //   name: data.name,
        //   email: data.email,
        // })
        router.push('/login')
        form.reset()
        toast.success('Account created successfully')
      }
    } catch (error: any) {
      if (error.response.status === 401 || error.response.status === 409) {
        toast.error(`${error?.response?.data?.message}`)
      }
    }
  })

  return (
    <div className="grid h-screen w-full items-center justify-center md:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="flex flex-col gap-2">
            <Image src={DabliwAnimationGIF} width={50} alt="Logo" />
            <h1 className="text-xl font-bold">Sign up to get started</h1>
            <span className="text-sm text-muted-foreground">
              Do you have an account?{' '}
              <Link
                href="/login"
                className="bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text font-semibold text-transparent"
              >
                Sign In
              </Link>
            </span>
          </div>
          <Form {...form}>
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input placeholder="Alan Turing" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="alan.turing@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*******"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-600 via-rose-500 to-indigo-600 font-semibold text-white"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="mr-3 h-4 w-4 animate-spin text-white" />
                ) : (
                  <>Register</>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="hidden items-center justify-center md:flex md:h-screen">
        <h1 className="bg-gradient-to-r  from-indigo-400 to-indigo-700 bg-clip-text text-8xl font-bold tracking-tight text-transparent ">
          Dabliw
        </h1>
      </div>
    </div>
  )
}
