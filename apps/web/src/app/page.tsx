'use client'

import { Header } from '@/components/header'
import { Hero } from '@/components/hero'

export default function Home() {
  return (
    <div className="absolute w-full">
      <Header />
      <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-black via-purple-600/15 to-black">
        <Hero />
      </div>
    </div>
  )
}
