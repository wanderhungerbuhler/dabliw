'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemePage() {
  const [mounted, setMounted] = useState(false)
  const theme = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const handleBirthdayTheme = (themeBirthday: 'light' | 'dark') => {
    if (themeBirthday === 'light') {
      theme.setTheme('dark')
    } else if (themeBirthday === 'dark') {
      theme.setTheme('light')
    }
  }

  return (
    <div className="flex flex-col justify-center rounded-md border p-5">
      <div>
        <h3 className="text-xl font-semibold">Theme</h3>
        <p className="text-muted-foreground">
          Select the theme for the dashboard
        </p>
      </div>

      <div className="mt-5 flex justify-center">
        {theme.theme === 'light' ? (
          <div
            onClick={() => handleBirthdayTheme('light')}
            className="cursor-pointer rounded-md border-transparent p-10 text-3xl transition-all hover:border hover:border-muted"
          >
            🎉
          </div>
        ) : (
          <div
            onClick={() => handleBirthdayTheme('dark')}
            className="cursor-pointer rounded-md border-transparent p-10 text-3xl transition-all hover:border hover:border-muted"
          >
            💡
          </div>
        )}
      </div>
    </div>
  )
}
