import { ClockIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import type { Attendance } from '@admin/types/attendances'

import { Avatar } from '@admin/components/atoms/Avatar'
import { stringDatetimeFormat } from '@admin/utils'

export const AttendanceCard = ({ data }: { data: Attendance }) => {
  const { t } = useTranslation()
  return (
    <div className="w-full px-4 py-2 rounded-lg bg-white text-gray-600 flex justify-between">
      <div className="flex gap-3">
        <Avatar
          className="w-12 h-12 object-contain rounded-full ring-1 ring-gray-200"
          src={data.uploads?.name && `${import.meta.env.VITE_AVATAR_DOMAIN}${data.uploads?.name}`}
        />
        <div>
          <p className="text-base leading-6 font-bold">
            {data?.first_name} {data?.last_name}
          </p>
          <p className="flex items-center gap-1 text-sm mt-1">
            <ClockIcon className="h-4 w-4" /> {stringDatetimeFormat(data?.attendances?.created_at)}
          </p>
        </div>
      </div>
      {data?.deleted_at ? (
        <p className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 h-fit">
          {t('common.Deleted')}
        </p>
      ) : data?.attendances?.status ? (
        <p className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20 h-fit">
          {t('common.Present')}
        </p>
      ) : (
        <p className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-sm font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20 h-fit">
          {t('common.Late')}
        </p>
      )}
    </div>
  )
}
