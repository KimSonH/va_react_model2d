import type { FC } from 'react'

import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/solid'

type Props = {
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  onClick?: () => void
  content?: string
}

export const Alert: FC<Props> = ({ type, title, content, onClick }) => {
  return (
    <div
      className={`${
        type === 'success'
          ? 'bg-green-50'
          : type === 'error'
          ? 'bg-red-50'
          : type === 'warning'
          ? 'bg-yellow-50'
          : 'bg-blue-50'
      } rounded-md p-4`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {type === 'success' && <CheckCircleIcon className="w-5 h-5 text-green-400" />}
          {type === 'error' && <XCircleIcon className="w-5 h-5 text-red-400" />}
          {type === 'warning' && <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400" />}
          {type === 'info' && <InformationCircleIcon className="w-5 h-5 text-blue-400" />}
        </div>
        <div className="ml-3">
          <h3
            className={`text-sm font-medium ${
              type === 'success'
                ? 'text-green-800'
                : type === 'error'
                ? 'text-red-800'
                : type === 'warning'
                ? 'text-yellow-800'
                : 'text-blue-800'
            }`}
          >
            {title}
          </h3>
          {content && (
            <div
              className={`mt-2 text-sm ${
                type === 'success'
                  ? 'text-green-700'
                  : type === 'error'
                  ? 'text-red-700'
                  : type === 'warning'
                  ? 'text-yellow-700'
                  : 'text-blue-700'
              }`}
            >
              <p>{content}</p>
            </div>
          )}
        </div>
        {onClick && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClick}
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  type === 'success'
                    ? 'bg-green-50 text-green-500 hover:text-green-700 focus:ring-offset-green-50 focus:ring-green-600'
                    : type === 'error'
                    ? 'bg-red-50 text-red-500 hover:text-red-700 focus:ring-offset-red-50 focus:ring-red-600'
                    : type === 'warning'
                    ? 'bg-yellow-50 text-yellow-500 hover:text-yellow-700 focus:ring-offset-yellow-50 focus:ring-yellow-600'
                    : 'bg-blue-50 text-blue-500 hover:text-blue-100 focus:ring-offset-blue-50 focus:ring-blue-600'
                }`}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
