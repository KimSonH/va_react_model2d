import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react'
import { useId, useState } from 'react'

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { Textbox } from '@admin/components/atoms/Textbox'

type Props = {
  className?: string
  titleLevel?: 3 | 4 | 5 | 6
  labelProps: Omit<ComponentPropsWithoutRef<'label'>, 'htmlFor' | 'className'>
  textboxProps: Omit<ComponentPropsWithRef<'input'>, 'id'>
  description?: string
  error?: string
  isRequired?: boolean
  onClick?: () => void
  showPassWord?: boolean
}

export const TextboxWithIconEye = ({
  className = '',
  titleLevel = 3,
  labelProps: { children, ...labelProps },
  textboxProps,
  description,
  error,
  isRequired = false
}: Props) => {
  const { t } = useTranslation()
  const descriptionId = useId()
  const errorMessageId = useId()
  const [showPassWord, setShowPassWord] = useState<boolean>(false)
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
        <div className="mt-1 relative flex">
          <Textbox
            {...textboxProps}
            aria-describedby={descriptionId}
            aria-invalid={!!error}
            aria-errormessage={errorMessageId}
            type={`${showPassWord ? 'text' : 'password'}`}
          />
          <button
            type="button"
            className="w-6 h-6 absolute right-3 -translate-y-2/4 top-2/4 select-none"
            onClick={() => setShowPassWord(!showPassWord)}
          >
            {showPassWord ? <EyeSlashIcon className=" text-gray-400 " /> : <EyeIcon className=" text-gray-400 " />}
          </button>
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
