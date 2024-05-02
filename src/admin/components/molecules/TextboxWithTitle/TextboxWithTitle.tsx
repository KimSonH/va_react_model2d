import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react'
import { useId } from 'react'

import { useTranslation } from 'react-i18next'

import { Textbox } from '@/admin/components/atoms/Textbox'

type Props = {
  className?: string
  titleLevel?: 3 | 4 | 5 | 6
  labelProps: Omit<ComponentPropsWithoutRef<'label'>, 'htmlFor' | 'className'>
  textboxProps: Omit<ComponentPropsWithRef<'input'>, 'id'>
  description?: string
  error?: string
  isRequired?: boolean
  disabled?: boolean
}

export const TextboxWithTitle = ({
  className = '',
  titleLevel = 3,
  labelProps: { children, ...labelProps },
  textboxProps,
  description,
  error,
  isRequired = false,
  disabled = false
}: Props) => {
  const { t } = useTranslation()
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
          {children}
        </span>
        <div className="mt-1">
          <Textbox
            {...textboxProps}
            className={textboxProps?.className}
            aria-describedby={descriptionId}
            aria-invalid={!!error}
            aria-errormessage={errorMessageId}
            disabled={disabled}
          />
        </div>
      </label>
      <div className="">
        {description && (
          <p id={descriptionId} className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        )}
        {error && (
          <p id={errorMessageId} className="mt-1 text-sm text-red-600">
            {t(`error.${error}`, error)}
          </p>
        )}
      </div>
    </div>
  )
}
