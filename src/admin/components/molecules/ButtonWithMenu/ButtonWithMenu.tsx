import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Fragment } from 'react'

import { Menu, Transition } from '@headlessui/react'

import { MenuButton } from '@/admin/components/atoms/MenuButton'

type Props = {
  className?: string
  menuButtonProps: ComponentPropsWithoutRef<'button'> & {
    children: ReactNode
  }
  menuItemsProps: ComponentPropsWithoutRef<'div'>
  children: React.ReactNode
}

export const ButtonWithMenu = ({
  className = '',
  menuButtonProps: { children: menuButtonChildren, ...menuButtonProps },
  menuItemsProps: { className: menuItemsClassName, ...menuItemsProps },
  children: menuItemChildren
}: Props) => {
  return (
    <Menu as="div" className={`${className} relative`}>
      <div className="flex items-center">
        <MenuButton children={menuButtonChildren} {...menuButtonProps} />
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={menuItemsClassName} {...menuItemsProps}>
          {menuItemChildren}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
