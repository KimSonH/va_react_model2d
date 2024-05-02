import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

export const Button = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>(function ButtonBase(
  { className = '', ...props },
  ref
) {
  return (
    <button
      {...props}
      ref={ref}
      className={`${className} inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400`}
    />
  )
})
