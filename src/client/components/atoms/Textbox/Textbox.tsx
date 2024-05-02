import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

export const Textbox = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(function TextboxBase(
  { className = '', ...props },
  ref
) {
  return (
    <input
      type="text"
      {...props}
      className={`${className} appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-200`}
      ref={ref}
    />
  )
})
