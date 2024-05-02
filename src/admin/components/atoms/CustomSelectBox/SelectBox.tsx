import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

export const SelectBox = forwardRef<HTMLSelectElement, ComponentPropsWithoutRef<'select'>>(function SelectboxBase(
  { className = '', ...props },
  ref
) {
  return (
    <select
      className={`${className} block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
      {...props}
      ref={ref}
    />
  )
})
