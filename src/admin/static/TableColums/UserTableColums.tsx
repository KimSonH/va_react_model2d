import type { Dispatch, SetStateAction } from 'react'
import { useMemo } from 'react'

import { CheckCircleIcon, PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'

import type { ColumnsType } from '@admin/types/common/Table'
import type { User } from '@admin/types/users'
import type { TFunction } from 'i18next'

import { Avatar } from '@admin/components/atoms/Avatar'
import { getAdminDomainUploadFromLocalStorage } from '@admin/components/hooks/useQueryAdmin'
import { DeleteButton } from '@admin/components/molecules/DeleteButton'
import { Button } from '@client/components/atoms/Button'

type Props = {
  dataUser?: User[]
  t: TFunction<'translation', undefined>
  onCLickOpenEditModal?: (value: string[]) => void
  onCLickDeleteData: (value: string[]) => void
  setShowModal?: Dispatch<SetStateAction<boolean>>
  onChangeActive?: (isActive: boolean, value?: string[]) => void
}

export const UserTableColumns = ({ t, onCLickOpenEditModal, onCLickDeleteData, onChangeActive, dataUser }: Props) => {
  const domain = getAdminDomainUploadFromLocalStorage()

  const Columns: ColumnsType<User> = useMemo(
    () => [
      {
        title: '',
        dataIndex: 'uploads',
        key: 'uploads',
        className: 'w-28 !text-center',
        render: (data) =>
          data?.name ? (
            <div className="flex flex-col justify-center items-center w-full">
              <Avatar
                className="object-contain w-10 h-10 rounded-full border border-gray-200"
                alt={t('column.Avatar')}
                src={`${domain}/${data?.name}`}
              />
              <p className="text-xs font-semibold mt-1">{!data?.status && 'Invalid Avatar'}</p>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center w-full">
              <svg
                className="object-contain w-10 h-10 rounded-full border border-gray-200 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="text-xs font-semibold mt-1">No image</p>
            </div>
          )
      },
      {
        title: t('column.User name', { defaultValue: 'Name' }),
        dataIndex: 'first_name',
        key: 'name',
        render: (_, data) => (
          <div>
            <div className="font-medium text-gray-900">
              {data.first_name} {data.last_name}
            </div>
            <div className="mt-1 text-gray-500">{data.email}</div>
          </div>
        )
      },
      {
        title: t('column.Status', { defaultValue: 'Status' }),
        dataIndex: 'status',
        key: 'status',
        render: (data) => (
          <>
            {!data ? (
              <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                {t('common.Inactive')}
              </span>
            ) : (
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                {t('common.Active')}
              </span>
            )}
          </>
        )
      },
      {
        title: '',
        dataIndex: '',
        className: 'border-l w-[50px]',
        key: 'action',
        render: (_, data) => (
          <div className="flex gap-3 justify-end">
            {onChangeActive && (
              <Button
                type="button"
                disabled={!data.uploads?.status}
                className={`${
                  data.status
                    ? '!border-yellow-400  !text-yellow-400 hover:!text-yellow-700 hover:border-yellow-700'
                    : '!border-green-400  !text-green-400 hover:!text-green-700 hover:border-green-700'
                } bg-white border hover:bg-white !p-1 disabled:!text-gray-500 disabled:!border-gray-500`}
                onClick={() => onChangeActive(!data.status, [data.id])}
              >
                {data.status ? (
                  <XCircleIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </Button>
            )}
            {onCLickOpenEditModal && (
              <Button
                className="bg-white border !border-indigo-400 !p-1 !text-indigo-400 hover:!text-indigo-700 hover:bg-white hover:border-indigo-700"
                onClick={() => onCLickOpenEditModal([data.id])}
              >
                <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
              </Button>
            )}
            <DeleteButton
              onClick={() => {
                onCLickDeleteData([data.id])
              }}
            />
          </div>
        )
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, dataUser]
  )

  return {
    Columns
  }
}
