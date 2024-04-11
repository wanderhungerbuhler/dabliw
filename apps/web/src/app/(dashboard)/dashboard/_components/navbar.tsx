import { Menu, X } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

type NavbarProps = {
  menuMobile: boolean
  setMenuMobile: (value: boolean) => void
}

export function Navbar({ menuMobile, setMenuMobile }: NavbarProps) {
  const navbarMenu = [
    { name: 'Feedback', icon: '', path: '/#', active: false },
    { name: 'Help', icon: '', path: '/#', active: false },
    { name: 'Docs', icon: '', path: '/#', active: false },
  ]

  return (
    <div>
      <header
        className={cn(
          'flex w-full items-center justify-end border-b p-5 text-sm',
        )}
      >
        <div className="mr-5 cursor-pointer md:hidden">
          {menuMobile ? (
            <X
              className="cursor-pointer"
              onClick={() => setMenuMobile(!menuMobile)}
            />
          ) : (
            <Menu
              className="cursor-pointer"
              onClick={() => setMenuMobile(!menuMobile)}
            />
          )}
        </div>
        <ul className="flex gap-5 text-muted-foreground">
          {navbarMenu.map((item) => (
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
      </header>
    </div>
  )
}
