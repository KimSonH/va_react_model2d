import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

export const InputUpload = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(function TextboxBase(
  { className = '', ...props },
  ref
) {
  return (
    <input
      type="file"
      {...props}
      className={`${className} appearance-none block w-full h-[6.039vh] xl:h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 xl:text-sm`}
      ref={ref}
    />
  )
})
