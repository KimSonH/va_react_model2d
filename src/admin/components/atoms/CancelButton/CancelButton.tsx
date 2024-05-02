import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

export const CancelButton = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>(function CancelButtonBase(
  { className = '', ...props },
  ref
) {
  return (
    <button
      {...props}
      ref={ref}
      className={`${className} inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
    />
  )
})
