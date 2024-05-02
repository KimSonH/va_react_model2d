import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Fragment } from 'react'

import { Menu } from '@headlessui/react'

type Props = ComponentPropsWithoutRef<'button'> & {
  children: ReactNode
}

export const MenuButton = ({ children, className = '', ...props }: Props) => {
  return (
    <Menu.Button as={Fragment}>
      <button className={className} {...props} onClick={(e) => e.stopPropagation()}>
        {children}
      </button>
    </Menu.Button>
  )
}
