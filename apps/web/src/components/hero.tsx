import Image from 'next/image'

import DabliwAnimationGIF from '../../public/dabliw-animation.gif'

export function Hero() {
  return (
    <>
      <div className="mb-5 flex items-center justify-center ">
        <Image
          src={DabliwAnimationGIF}
          width={100}
          height={100}
          alt="Dabliw Animation GIF"
        />
      </div>

      <div className="space-y-0">
        <div>
          <h1 className="text-center text-7xl font-semibold tracking-tighter">
            Wish Happy
          </h1>
        </div>

        <div className="flex items-center justify-center md:flex-row">
          <span className="-mt-4 bg-gradient-to-r from-yellow-600 via-rose-500 to-indigo-600 bg-clip-text text-center text-8xl font-bold tracking-tighter text-transparent">
            Birthda
          </span>
          <div className="text-8xl">🎉</div>
        </div>

        <p className="m-auto w-[80%] text-center text-muted-foreground">
          Remember and send a birthday wish to your friends and family
        </p>
      </div>
    </>
  )
}
