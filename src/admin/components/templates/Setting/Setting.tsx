import { useState } from 'react'

import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import type { ProfileInput } from '@admin/schema/profile'
import type { AttendanceInput } from '@admin/schema/setting'
import type { SettingListData } from '@admin/types/settings'

import { Notification } from '@admin/components/atoms/Notification'
import { PageTitle } from '@admin/components/atoms/PageTitle'
import { useMutateUpdateProfile } from '@admin/components/hooks/useMutateAdmin'
import { useMutateChangeTimeAttendance } from '@admin/components/hooks/useMutateSetting'
import { SettingList } from '@admin/components/molecules/SettingList'
import { LanguageForm } from '@admin/components/organisms/SettingForm'
import { AttendanceForm } from '@admin/components/organisms/SettingForm/Attendance'

export const Setting = () => {
  const { t, i18n } = useTranslation()
  // show notification
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const [notificationText, setNotificationText] = useState<{
    text: string
    subText?: string
    className: string
    Icon: React.ForwardRefExoticComponent<
      Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
        title?: string
        titleId?: string
      } & React.RefAttributes<SVGSVGElement>
    >
  } | null>(null)
  const timeOutNotification = () => {
    setShowNotification(true)

    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  const { mutateAsync } = useMutateUpdateProfile()
  const { mutateAsync: mutateChangeAttendanceTime } = useMutateChangeTimeAttendance()

  const handleChangeLanguage = async (values: ProfileInput) => {
    await mutateAsync(values).then((res) => {
      if (!res.errors) {
        i18n.changeLanguage(values.language.toLocaleLowerCase())
        setNotificationText({
          text: t('common.success'),
          className: 'h-6 w-6 text-green-400',
          Icon: CheckCircleIcon
        })
      } else {
        setNotificationText({
          text: t('error.Something wrong'),
          className: 'h-6 w-6 text-red-400',
          Icon: XCircleIcon
        })
      }
    })

    timeOutNotification()
  }

  const handleChangeAttendanceTime = async (values: AttendanceInput) => {
    await mutateChangeAttendanceTime(values).then((res) => {
      if (!res.errors) {
        setNotificationText({
          text: t('common.success'),
          className: 'h-6 w-6 text-green-400',
          Icon: CheckCircleIcon
        })
      } else {
        setNotificationText({
          text: t('error.Something wrong'),
          className: 'h-6 w-6 text-red-400',
          Icon: XCircleIcon
        })
      }
    })
    timeOutNotification()
  }

  const settingListData: SettingListData = [
    {
      title: t('common.Language'),
      content: <LanguageForm onValid={(values) => handleChangeLanguage(values)} />
    },
    {
      title: t('settings.Attendance Time'),
      content: <AttendanceForm onValid={(values) => handleChangeAttendanceTime(values)} />
    }
  ]

  return (
    <div className="space-y-6">
      <PageTitle title={t('settings.settings', { defaultValue: 'Settings' })} />
      <div>
        <SettingList data={settingListData} />
      </div>
      <Notification
        show={showNotification}
        setShow={setShowNotification}
        text={notificationText?.text}
        subText={notificationText?.subText}
        IconProps={{
          props: {
            className: notificationText?.className
          },
          Icon: notificationText?.Icon
        }}
      />
    </div>
  )
}
