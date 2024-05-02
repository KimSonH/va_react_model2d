import type { ComponentPropsWithRef, ComponentPropsWithoutRef, FormEvent } from 'react'
import { useId } from 'react'

import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { InputUpload } from '@admin/components/atoms/InputUpload'

type Props = {
  className?: string
  titleLevel?: 3 | 4 | 5 | 6
  textboxProps?: Omit<ComponentPropsWithRef<'input'>, 'id'>
  labelProps: Omit<ComponentPropsWithoutRef<'label'>, 'htmlFor' | 'className'>
  error?: string
  isRequired?: boolean
  disabled?: boolean
  onChange: (e: FormEvent<HTMLInputElement>) => void
  image?: string
}

export const UploadFileWithLabel = ({
  className = '',
  titleLevel = 3,
  labelProps: { children, ...labelProps },
  error,
  textboxProps,
  isRequired = false,
  disabled = false,
  onChange,
  image
}: Props) => {
  const { t } = useTranslation()

  const errorMessageId = useId()
  const descriptionId = useId()

  return (
    <div>
      <div className={`${className}`}>
        <label
          {...labelProps}
          className="bg-transparent hover:bg-gray-400 bg-opacity-25 text-center p-2 text-white hover:bg-opacity-50 absolute rounded-md w-40 h-40 flex flex-col justify-center items-center group transform duration-200"
        >
          <ArrowUpOnSquareIcon className="w-10 h-10 group-hover:opacity-100 opacity-0 transform duration-200" />
          <span
            role="heading"
            aria-level={titleLevel}
            className={`block text-sm font-medium group-hover:opacity-100 opacity-0 transform duration-200 ${
              isRequired ? 'required' : ''
            }`}
          >
            {/* {children} */}
            {t('common.upload', { defaultValue: 'Upload' })}
          </span>
          <div className="hidden">
            <InputUpload
              {...textboxProps}
              disabled={disabled}
              className={textboxProps?.className}
              aria-describedby={descriptionId}
              aria-invalid={!!error}
              aria-errormessage={errorMessageId}
              onChange={onChange}
            />
          </div>
        </label>
        {image ? (
          <img alt="img user" className="object-cover rounded-md w-40 h-40 border" src={image} />
        ) : (
          <svg
            className={`object-cover rounded-md w-40 h-40 border text-gray-300`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </div>

      {error && (
        <p id={errorMessageId} className="mt-1 md:pl-2 md:mb-0 mb-4 text-sm text-red-600">
          {t(`error.${error}`, { defaultValue: error })}
        </p>
      )}
    </div>
  )
}
