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
      className={`${className} inline-flex items-center justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium bg-white text-indigo-400 hover:text-indigo-700 border-indigo-400 hover:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 disabled:bg-gray-400`}
    />
  )
})
