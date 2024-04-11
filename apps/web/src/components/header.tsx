'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import { Button } from './ui/button'

export function Header() {
  const [menuMobile, setMenuMobile] = useState(false)

  const menu = [
    {
      name: 'About',
      path: '/about',
      active: false,
    },
    {
      name: 'Blog',
      path: '/blog',
      active: false,
    },
    {
      name: 'Customers',
      path: '/customers',
      active: false,
    },
    {
      name: 'Pricing',
      path: '/pricing',
      active: false,
    },
    {
      name: 'Enterprise',
      path: '/enterprise',
      active: false,
    },
    {
      name: 'Changelog',
      path: '/changelog',
      active: false,
    },
    {
      name: 'Docs',
      path: '/docs',
      active: false,
    },
  ]

  const navMenuMobile = () => {
    return (
      <div className="fixed left-0 right-0 top-20 z-50 flex h-auto flex-col gap-5 bg-black p-10 text-sm text-muted-foreground md:hidden">
        {menu.map((item) => (
          <Link
            href={item.active ? item.path : '/#'}
            key={item.name}
            className={cn(
              'border-b border-muted pb-5 text-xl',
              item.active ? 'cursor-pointer' : 'cursor-not-allowed',
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    )
  }

  return (
    <header className="bg-muted-foreground/2 fixed flex h-20 w-full items-center justify-between px-10">
      <h1 className="text-xl font-bold tracking-tighter">Dabliw</h1>

      {menuMobile && navMenuMobile()}

      <ul className="hidden  gap-5 text-sm text-muted-foreground md:flex">
        {menu.map((item) => (
          <Link
            href={item.active ? item.path : '/#'}
            key={item.name}
            className={cn(
              '',
              item.active ? 'cursor-pointer' : 'cursor-not-allowed',
            )}
          >
            {item.name}
          </Link>
        ))}
      </ul>

      <div className="flex items-center justify-center">
        <div className="md:hidden" onClick={() => setMenuMobile(!menuMobile)}>
          {menuMobile ? (
            <X className="mr-2 h-7 w-7 cursor-pointer" />
          ) : (
            <Menu className="mr-2 h-7 w-7 cursor-pointer" />
          )}
        </div>

        <div className="rounded-full bg-gradient-to-b from-transparent via-transparent to-indigo-600 p-[1px]">
          <div className="flex w-full items-center justify-center rounded-full bg-black">
            <Link href="/login">
              <Button
                size="sm"
                variant="ghost"
                className="rounded-full text-muted dark:text-white"
              >
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
