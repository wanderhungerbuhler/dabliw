'use client'
import { useQuery } from '@tanstack/react-query'
import { CreditCard, ExternalLink, LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'

import LayoutLoader from '../loading'
import { getUser } from '../querys/user-query'
import { Logout } from './logout'

type User = {
  id: string
  email: string
  name: string
}

export function UserDropdown() {
  const router = useRouter()

  const { isLoading, data: profile } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  })

  const user = profile ? JSON.parse(profile) : null

  if (!user) return null

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex w-full items-center justify-center bg-black">
        <LayoutLoader />
      </div>
    )
  }

  const handleLogout = async () => {
    Logout()
    router.push('/')
    localStorage.removeItem('@dabliw:token')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex h-12 w-full items-center justify-start space-x-2"
        >
          <Avatar className="h-8 w-8 items-center justify-center bg-muted">
            {user?.name && (
              <>
                <AvatarImage
                  src={`https://ui-avatars.com/api/?name=${user.name}`}
                  alt="Avatar"
                />
              </>
            )}
          </Avatar>
          <div className="flex flex-1 flex-col space-y-1 text-left">
            {!user?.name && !user?.email ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            ) : (
              <>
                <p className="text-xs font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings" className="cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/" className="cursor-pointer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Homepage
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-rose-600 focus:bg-rose-600 focus:text-white"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
