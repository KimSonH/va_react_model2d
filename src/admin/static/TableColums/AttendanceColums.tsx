import { useMemo } from 'react'

import type { Attendance } from '@admin/types/attendances'
import type { ColumnsType } from '@admin/types/common/Table'
import type { TFunction } from 'i18next'

import { Avatar } from '@admin/components/atoms/Avatar'
import { getAdminDomainUploadFromLocalStorage } from '@admin/components/hooks/useQueryAdmin'
import { stringTimeFormat } from '@admin/utils'

type Props = {
  dataAttendances?: Attendance[]
  t: TFunction<'translation', undefined>
}

export const AttendanceTableColumns = ({ t, dataAttendances }: Props) => {
  const domain = getAdminDomainUploadFromLocalStorage()
  const Columns: ColumnsType<Attendance> = useMemo(
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
        title: t('column.User name', { defaultValue: 'User name' }),
        dataIndex: 'attendances',
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
        dataIndex: 'attendances',
        key: 'status',
        render: (data, record) => (
          <>
            {record.deleted_at ? (
              <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                {t('common.Deleted')}
              </span>
            ) : !data?.status ? (
              <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                {t('common.Late')}
              </span>
            ) : (
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                {t('common.Present')}
              </span>
            )}
          </>
        )
      },
      {
        title: t('column.Created at', { defaultValue: 'Created at' }),
        dataIndex: 'attendances',
        key: 'created_at',
        render: (data) => <div>{stringTimeFormat(data.created_at)}</div>
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, dataAttendances]
  )

  return {
    Columns
  }
}
