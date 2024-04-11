/* eslint-disable react/no-unescaped-entities */
'use client'
import { useQuery } from '@tanstack/react-query'
import { Cake, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { Main } from '../_components/main'
import { CreatePerson } from './components/create-birthday-person'
import { DataTable } from './components/data-table'
import { getBirthdayFn } from './querys/birthday-query'

export default function BirthdayPage() {
  const { isLoading, data } = useQuery({
    queryKey: ['birthday'],
    queryFn: getBirthdayFn,
  })

  return (
    <div>
      <Main
        title="Birthday"
        icon={Cake}
        description="Remender and send a birthday wish to your friends and family"
      />

      {isLoading ? (
        <Skeleton className="mt-5 w-full p-10">
          <div className="flex justify-between md:gap-2">
            <Skeleton className="h-[30px] w-full md:w-1/3" />
            <div className="flex justify-end md:w-10/12 md:gap-2">
              <Skeleton className="h-[30px] w-1/6" />
              <Skeleton className="h-[30px] w-1/6" />
            </div>
          </div>

          <Skeleton className="mt-5 h-[30px]" />
          <Skeleton className="mt-5 h-[30px]" />
          <Skeleton className="mt-5 h-[30px] " />
        </Skeleton>
      ) : data?.length > 0 ? (
        <DataTable data={data} />
      ) : (
        <div className="mt-5 flex flex-col items-center justify-center rounded-md border border-border py-32">
          <span className="text-center text-xl font-semibold text-foreground dark:text-zinc-200">
            You don't have any Birthday person yet
          </span>
          <p className="text-center text-sm font-normal text-muted-foreground">
            Create a new person to you wish a birthday
          </p>
          <CreatePerson>
            <Button
              className="mt-5 text-white dark:text-white"
              variant="birthday"
              size="sm"
            >
              <Plus className="mr-2 h-4 w-4" /> Create a birthday 🎉
            </Button>
          </CreatePerson>
        </div>
      )}
    </div>
  )
}
