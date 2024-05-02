import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react'

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { Textbox } from '@admin/components/atoms/Textbox'

type Props = {
  className?: string
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  labelProps: Omit<ComponentPropsWithoutRef<'label'>, 'htmlFor' | 'className'>
  textboxProps: Omit<ComponentPropsWithRef<'input'>, 'id'>
  resetSearch: () => void
}

export const TextboxForSearch = ({
  className = '',
  onSubmit,
  labelProps: { children, ...labelProps },
  textboxProps,
  resetSearch
}: Props) => {
  return (
    <form className={`${className}`} onSubmit={onSubmit}>
      <label className="sr-only" {...labelProps}>
        {children}
      </label>
      <div className="w-full flex border rounded-md">
        <Textbox {...textboxProps} className={textboxProps?.className} />
        {(textboxProps.value as string).length > 0 && (
          <div className="flex items-center ">
            <button
              type="button"
              onClick={resetSearch}
              className="p-2 md:p-2.5 group relative text-gray-400 hover:text-gray-600 min-w-0 flex-1 overflow-hidden bg-white text-sm font-medium text-center focus:z-10"
            >
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
        <div>
          <button
            type="submit"
            className={`${
              (textboxProps.value as string).length > 0 &&
              'text-gray-100 mb-[-1px] mt-[-1px] mr-[-1px] h-[calc(100%+2px)]'
            } bg-white p-2 md:p-2.5 border border-indigo-400 text-indigo-400 hover:text-indigo-700 group relative min-w-0 flex-1 overflow-hidden text-sm font-medium text-center hover:border-indigo-700 focus:z-10 last:rounded-r-md`}
          >
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </form>
  )
}
