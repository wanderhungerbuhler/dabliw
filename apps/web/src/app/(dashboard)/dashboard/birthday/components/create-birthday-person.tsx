/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { CalendarIcon, Loader2, Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { useStore } from '@/store/birthday/birthday-modal-store'

import { createBirthdayMutation } from '../mutation/create-birthday-mutation'
import { getPostalCodeMutation } from '../mutation/postalcode-query'
import { PersonBodySchema } from './schema'
import { CreatePersonProps } from './types'

export type CreatePersonBodySchema = z.infer<typeof PersonBodySchema>

export function CreatePerson({ children }: CreatePersonProps) {
  const { setBirthday } = useStore()

  const queryClient = useQueryClient()
  const router = useRouter()

  const ref = useRef<HTMLDivElement>(null)

  const form = useForm<CreatePersonBodySchema>({
    resolver: zodResolver(PersonBodySchema),
    defaultValues: {
      name: '',
      gender: '',
      birthdate: new Date(),
      maritalStatus: '',
      address: [
        {
          address: '',
          number: '',
          city: '',
          district: '',
          postalCode: '',
          state: '',
        },
      ],
    },
    mode: 'onBlur',
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'address',
  })

  const { mutateAsync: createPersonMutationFn } = useMutation({
    mutationFn: createBirthdayMutation,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['birthday'] }),
  })

  const { mutateAsync: getPostalCodeMutationFn } = useMutation({
    mutationFn: getPostalCodeMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postalCode'] })
    },
  })

  async function handleGetPostalCode(postalCode: string) {
    const response = await getPostalCodeMutationFn(postalCode)

    if (response.ok) {
      const { cep, logradouro, localidade, bairro } = await response.json()

      const currentAddresses = form.getValues('address') || []

      const newAddress = {
        address: logradouro,
        number: '',
        city: localidade,
        state: localidade,
        district: bairro,
        postalCode: cep,
      }

      const updatedAddresses = [...currentAddresses, newAddress]

      form.setValue('address', updatedAddresses)
    }
  }

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await createPersonMutationFn(data)

      if (response.data) {
        toast.success(`The ${data.name} person created`, {
          description: 'Your person has been created successfully.',
        })

        const birthdayDate = format(data.birthdate, 'dd-MM')
        const currentDate = format(new Date(), 'dd-MM')

        if (birthdayDate === currentDate) {
          setBirthday(data.name)
        }
      }

      form.reset()
      router.refresh()
      ref.current?.click()
    } catch (error: any) {
      toast.error(`${error.message}`, {
        description:
          'An error occurred while creating the person. Maybe you dont have permission to do this action.',
      })
    }
  })

  const addAddress = () => {
    append({
      address: '',
      number: '',
      city: '',
      district: '',
      postalCode: '',
      state: '',
    })
  }

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <div ref={ref}>{children}</div>
        </SheetTrigger>
        <SheetContent className="overflow-y-scroll">
          <Form {...form}>
            <form onSubmit={onSubmit} className="h-screen space-y-2">
              <SheetHeader>
                <SheetTitle>Create Birthday Person</SheetTitle>
                <SheetDescription className="text-xs">
                  Create a new birthday person and don't forget it again {':)'}
                </SheetDescription>
              </SheetHeader>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ex: Alan Mathison Turing"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Divorced">Divorced</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                      <FormMessage />
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem className="flex flex-col py-2">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maritalStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marital Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a marital status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Divorced">Divorced</SelectItem>
                      </SelectContent>
                      <FormMessage />
                    </Select>
                  </FormItem>
                )}
              />

              <div>
                <div className="mb-5 flex items-center justify-between p-2">
                  <h3 className="text-sm font-semibold">Location</h3>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={addAddress}
                  >
                    <Plus className="mr-2 h-4 w-4 text-indigo-600" />
                    New
                  </Button>
                </div>
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="mb-5 h-32 gap-2 space-y-2 overflow-scroll border-b p-2"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold">
                        Location {index + 1}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        <Trash className="h-4 w-4 text-rose-600" />
                      </Button>
                    </div>

                    <FormField
                      control={form.control}
                      name={`address.${index}.postalCode`}
                      render={({ field }) => {
                        const formatPostalCode = (value: string) => {
                          const regex = /^(\d{5})[-]?(\d{3})$/
                          let formattedValue = value.replace(regex, '$1-$2')
                          formattedValue = formattedValue.replace(
                            /[^0-9-]/g,
                            '',
                          )
                          formattedValue = formattedValue.substring(0, 9) // Limit to 9 characters
                          return formattedValue
                        }

                        const handlePostalCodeChange = async (e: {
                          target: { value: string }
                        }) => {
                          const formattedValue = formatPostalCode(
                            e.target.value,
                          )
                          if (formattedValue.length === 9) {
                            await handleGetPostalCode(formattedValue)
                          }

                          field.onChange(formattedValue)
                        }

                        return (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ex: 00000-000"
                                {...field}
                                onChange={handlePostalCodeChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )
                      }}
                    />

                    <FormField
                      control={form.control}
                      name={`address.${index}.address`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Plaque" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`address.${index}.number`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: 78" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`address.${index}.district`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>District</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Hampton" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`address.${index}.state`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Hampton" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`address.${index}.city`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Hampton" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>

              <SheetFooter className="mt-auto">
                <Button
                  size="sm"
                  className="flex items-center justify-center text-white dark:text-muted"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <Button
                      size="sm"
                      className="flex items-center justify-center text-white dark:text-muted"
                      disabled={form.formState.isSubmitting}
                    >
                      <Loader2 className="mr-3 h-4 w-4 animate-spin text-muted-foreground" />
                    </Button>
                  ) : (
                    <>Create person 🎉</>
                  )}
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  )
}
