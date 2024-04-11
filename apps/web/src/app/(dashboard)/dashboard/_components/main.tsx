import { ElementType } from 'react'

import { cn } from '@/lib/utils'

type MainProps = {
  title: string
  description?: string
  icon?: ElementType
}

export function Main({ title, description, icon: Icon }: MainProps) {
  return (
    <main
      className={cn('flex items-center', Icon && 'grid grid-cols-[5rem_1fr]')}
    >
      {Icon && (
        <>
          <div className="flex h-[65px] w-[65px] items-center justify-center rounded-md border bg-gradient-to-r from-yellow-600 via-rose-500 to-indigo-600 text-2xl">
            <div className="flex h-[60px] w-[58px] items-center justify-center rounded-md bg-gradient-to-b from-zinc-700 to-zinc-900">
              <Icon className="h-8 w-8 text-white" />
            </div>
          </div>
        </>
      )}

      <div className="flex flex-col">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </main>
  )
}
