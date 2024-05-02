import type { ComponentPropsWithoutRef } from 'react'

import LogoVR from '@/admin/assets/images/Logo.svg'

export const Logo = ({ className = '', ...props }: ComponentPropsWithoutRef<'img'>) => {
  return <img src={LogoVR} className={className} alt="waiwai" {...props} />
}
