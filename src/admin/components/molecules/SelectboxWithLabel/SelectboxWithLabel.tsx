import type { ComponentPropsWithoutRef } from 'react'
import { useId } from 'react'

import { SelectBox } from '@admin/components/atoms/CustomSelectBox'

type Props = {
  className?: string
  titleLevel?: 3 | 4 | 5 | 6
  labelProps: Omit<ComponentPropsWithoutRef<'label'>, 'htmlFor' | 'className'>
  selectBoxProps: Omit<ComponentPropsWithoutRef<'select'>, 'id'>
  description?: string
  error?: string
  isRequired?: boolean
}

export const SelectBoxWithLabel = ({
  className = '',
  titleLevel = 3,
  labelProps: { children: labelChildren, ...labelProps },
  selectBoxProps: { children: selectBoxChildren, value, ...selectBoxProps },
  description,
  error,
  isRequired = false
}: Props) => {
  const descriptionId = useId()
  const errorMessageId = useId()
  return (
    <div className={`${className}`}>
      <label {...labelProps}>
        <span
          role="heading"
          aria-level={titleLevel}
          className={`block text-sm font-medium text-gray-700 ${isRequired ? 'required' : ''}`}
        >
          {labelChildren}
        </span>
        <div className="mt-1">
          <SelectBox value={value} {...selectBoxProps}>
            {selectBoxChildren}
          </SelectBox>
        </div>
      </label>
      <div className="">
        {description && (
          <p id={descriptionId} className="mt-2 text-sm text-gray-500">
            {description}
          </p>
        )}
        {error && (
          <p id={errorMessageId} className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
