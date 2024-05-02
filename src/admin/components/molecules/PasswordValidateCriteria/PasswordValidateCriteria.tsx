import { memo } from 'react'

import { CheckIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

const regexOneLowerOneUpperCharacter = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])+/)

const regexOneDigit = new RegExp(/^(?=.*[0-9])+/)

const regexCharactersLength = new RegExp(/^(?=.{6,32}$)/)

export const regexValidSymbols = new RegExp(/^([a-zA-Z0-9@#\$%&?!]*)$/)

const validateCriteria = [
  { criteria: 'user.6-32 characters long', regex: regexCharactersLength },
  { criteria: 'user.At least one uppercase and one lowercase letter', regex: regexOneLowerOneUpperCharacter },
  { criteria: 'user.At least a number', regex: regexOneDigit }
]

type Props = {
  password: string
  isTouched: boolean
}

export const PasswordValidateCriteria = memo(({ password, isTouched }: Props) => {
  const { t } = useTranslation()

  return (
    <div>
      <p className="flex items-center text-sm font-medium my-1">
        <InformationCircleIcon className="text-blue-400 flex-shrink-0 -ml-1 mr-2 h-4 w-4" />
        {t('user.Password requirements')}
      </p>
      <ul>
        {validateCriteria.map((validation, index) => {
          return (
            <li
              key={`criteria-${index}`}
              className={`flex items-center ml-3 mb-1 text-sm ${
                isTouched ? (validation.regex.test(password) ? 'text-green-400' : 'text-red-500') : 'text-gray-500'
              }`}
            >
              {isTouched ? (
                validation.regex.test(password) ? (
                  <CheckIcon className="flex-shrink-0 -ml-1 mr-2 h-4 w-4" />
                ) : (
                  <XMarkIcon className="flex-shrink-0 -ml-1 mr-2 h-4 w-4" />
                )
              ) : (
                <span className="mr-2 text-red-500 text-sm font-medium">*</span>
              )}
              <span>{t(validation.criteria)}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
})
