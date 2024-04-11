'use client'

import { Main } from './_components/main'

export default function App() {
  function PartyIcon() {
    return '🎉'
  }

  return (
    <>
      <Main
        icon={PartyIcon}
        title="Wish a happy birthday"
        description="Remender and send a birthday wish to your friends and family"
      />
    </>
  )
}
