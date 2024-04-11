'use client'
import { Home, Mail, PartyPopper, Settings2, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import Logo from '../../../../../public/dabliw-animation.gif'
import { UserDropdown } from './user-dropdown'

export function Sidebar({ openDefault = false }) {
  const pathname = usePathname()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isActive = (path: string) => {
    return pathname === path
  }

  const menuRoutes = [
    {
      name: 'Overview',
      icon: Home,
      path: '/dashboard',
      available: true,
    },
    {
      name: 'Birthdays',
      icon: PartyPopper,
      path: '/dashboard/birthday',
      available: true,
    },
    {
      name: 'Emails',
      icon: Mail,
      path: '#',
      available: false,
    },
    {
      name: 'Settings',
      icon: Settings2,
      path: '/dashboard/settings',
      available: true,
    },
  ]

  return (
    <>
      <div
        className={cn(
          'flex-col border-r p-5 md:flex',
          openDefault
            ? 'fixed z-50 block h-screen bg-black'
            : 'relative hidden h-screen',
        )}
      >
        <div className="flex items-center justify-start">
          <Image src={Logo} width={40} alt="Logo" />
          <h1 className="ml-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Dabliw
          </h1>
        </div>

        <div className="mt-10 flex-1">
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
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

          <Button
            variant="upgrade"
            size="sm"
            className="mt-10 w-full cursor-not-allowed text-muted dark:text-zinc-100"
          >
            Upgrade <Zap className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <UserDropdown />
      </div>
    </>
  )
}
