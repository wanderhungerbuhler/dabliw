'use client'
import { CreditCard, Image, Settings2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { Main } from '../_components/main'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const menuRoutes = [
    {
      name: 'General',
      icon: Settings2,
      path: '/#',
      available: false,
    },
    {
      name: 'Theme',
      icon: Image,
      path: '/dashboard/settings/theme',
      available: true,
    },
    {
      name: 'Billing',
      icon: CreditCard,
      path: '/#',
      available: false,
    },
  ]

  return (
    <>
      <div className="mb-10">
        <Main title="Settings" />
      </div>

      <div className="grid md:grid-cols-[10rem_1fr]">
        <ul className="flex flex-col gap-2 pr-2 text-sm text-muted-foreground">
          {menuRoutes.map(({ name, icon: Icon, path, available }) => (
            <li key={name}>
              <Link
                href={!available ? '' : path}
                className={cn(
                  'flex items-center gap-2 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-zinc-900',
                  !available && 'cursor-not-allowed',
                  isActive(path) && 'bg-gray-100 dark:bg-zinc-900',
                )}
              >
                <Icon size={20} />
                <span>{name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-5 md:m-5 md:mt-0">{children}</div>
      </div>
    </>
  )
}
