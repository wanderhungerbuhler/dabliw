'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

import { Navbar } from './_components/navbar'
import { Sidebar } from './_components/sidebar'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const queryClient = new QueryClient()

  const [menuMobile, setMenuMobile] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-row">
        <Sidebar openDefault={menuMobile} />
        <div className="flex w-full flex-col">
          <Navbar menuMobile={menuMobile} setMenuMobile={setMenuMobile} />
          <main className="flex-grow px-20 pt-8">{children}</main>
        </div>
      </div>
    </QueryClientProvider>
  )
}
