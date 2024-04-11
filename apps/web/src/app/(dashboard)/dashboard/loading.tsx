import Image from 'next/image'

import DabliwAnimationGIF from '../../../../public/dabliw-animation.gif'

export default function LayoutLoader() {
  return (
    <div className="flex h-[calc(100vh-16px)] items-center justify-center">
      <Image
        src={DabliwAnimationGIF}
        width={50}
        height={50}
        alt="Logo Loading"
      />
    </div>
  )
}
