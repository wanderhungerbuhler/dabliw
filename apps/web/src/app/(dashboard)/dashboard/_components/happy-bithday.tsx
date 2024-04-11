import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Dialog, DialogContent } from '@/components/ui/dialog'

import DabliwHappyBirthdayGIF from '../../../../../public/dabliw-happy-birthday.gif'

export function HappyBirthday({
  open,
  name = 'Wander Hungerbühler',
}: {
  open: boolean
  name: string | null
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Dialog defaultOpen={open}>
      <DialogContent className="w-[90%]">
        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="relative -mt-40">
            <Image
              src={DabliwHappyBirthdayGIF}
              width={150}
              height={150}
              quality={100}
              alt="Happy Birthday"
            />
          </div>
          <div className="relative flex flex-col items-center justify-center">
            <div className="text-7xl">🎉</div>
            <h3 className="bg-gradient-to-r from-yellow-600 via-rose-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent">
              Happy Birthday
            </h3>
            <span className="text-2xl font-bold text-zinc-900 dark:text-white">
              {name}
            </span>
            <p className="mt-5 w-[70%] text-center text-sm text-muted-foreground">
              We are wishing you a day filled with happiness and a year filled
              with joy.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
