import { useMemo } from 'react'

import { ClockIcon, EnvelopeIcon, LanguageIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { IdUserMenu } from '@/client/types/common'
import { getUserLanguageFromLocalStorage } from '@client/components/hooks/useQueryUser'

type Props = {
  setOpen: (value: IdUserMenu) => void
}
export const UserMenu = ({ setOpen }: Props) => {
  const { t } = useTranslation()
  const language = getUserLanguageFromLocalStorage()
  const menuUser = useMemo(
    () => [
      {
        name: t('front.home.Profile.Profile'),
        child: [
          {
            name: <p className="text-base text-gray-700 font-medium truncate">{t('front.home.Profile.user')}</p>,
            icon: (
              <div className="p-2 bg-[#faf0e6] rounded-full">
                <EnvelopeIcon className="h-5 w-5 text-[#d6753c]" />
              </div>
            ),
            id: IdUserMenu.USER
          },
          {
            name: (
              <p className="text-base text-gray-700 font-medium truncate">{t('front.home.Profile.Change Password')}</p>
            ),
            icon: (
              <div className="p-2 bg-[#f0ffc6] rounded-full">
                <LockClosedIcon className="h-5 w-5 text-[#b6c43a]" />
              </div>
            ),
            id: IdUserMenu.CHANGE_PASS
          },
          {
            name: (
              <p className="text-base text-gray-700 font-medium truncate">
                {t('front.home.Profile.Attendance History')}
              </p>
            ),
            icon: (
              <div className="p-2 bg-[#ebe9fd] rounded-full">
                <ClockIcon className="h-5 w-5 text-[#6946f2]" />
              </div>
            ),
            id: IdUserMenu.ATTENDANCE
          }
        ]
      },
      {
        name: t('front.home.Profile.Settings'),
        child: [
          {
            name: (
              <p className="text-base text-gray-700 font-medium truncate flex justify-between w-full items-center">
                {t('front.home.Profile.Language')} <span className="block text-sm font-normal">{language}</span>
              </p>
            ),
            icon: (
              <div className="p-2 bg-[#ecf6fe] rounded-full">
                <LanguageIcon className="h-5 w-5 text-[#639ddb]" />
              </div>
            ),
            id: IdUserMenu.LANGUAGE
          }
        ]
      }
    ],
    [language, t]
  )

  return (
    <div className="space-y-10">
      {menuUser?.map((item, i) => {
        return (
          <div className="" key={i}>
            <p className="font-bold text-gray-800 truncate">{item.name}</p>
            <div className="space-y-2 mt-2">
              {item?.child?.map((child) => {
                return (
                  <button
                    key={child.id}
                    onClick={() => setOpen(child.id)}
                    className="flex space-x-5 items-center hover:bg-[#ffdb87] w-full p-2 rounded-lg"
                  >
                    {child?.icon}
                    {child?.name}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
