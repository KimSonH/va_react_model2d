import type { FC } from 'react'

import { XMarkIcon } from '@heroicons/react/24/outline'

import { classNames } from '@admin/utils'

type Props = {
  customClassName?: string
  disabled?: boolean
  onClick: () => void
}

export const CloseModalButton: FC<Props> = ({ customClassName = '', disabled, onClick }) => {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="block w-full">
      <XMarkIcon
        className={`${classNames(
          `w-8 h-8 mx-auto mt-2 sm:mt-4 border-2 border-white rounded-full text-gray-50 opacity-70 font-bold disabled:bg-gray-400`,
          customClassName
        )}`}
      />
    </button>
  )
}
