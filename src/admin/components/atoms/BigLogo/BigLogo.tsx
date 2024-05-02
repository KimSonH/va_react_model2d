import type { ComponentPropsWithoutRef } from 'react'

import logo from '@/admin/assets/images/Logo.svg'

export const BigLogo = ({ className = '', ...props }: ComponentPropsWithoutRef<'img'>) => {
  return <img src={logo} className={className} alt="VR" {...props} />
}
