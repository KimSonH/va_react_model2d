import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import type { LoginInput } from '@admin/schema/login/type'

import { useMutateLogin } from '@/admin/components/hooks/useMutateAdmin'
import { LoginForm } from '@/admin/components/organisms/LoginForm'
import { Notification } from '@admin/components/atoms/Notification'

export const Login = () => {
  const { t } = useTranslation()
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const navigate = useNavigate()
  const { mutateAsync } = useMutateLogin()

  // const [errors, setErrors] = useState<[{ field: string; message: string }] | null | undefined>(null)

  const [notificationText, setNotificationText] = useState<{
    text: string
    subText?: string
    classText?: string
  } | null>(null)

  const timeOutNotification = () => {
    setShowNotification(true)

    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  const onFinish = async (values: LoginInput) => {
    await mutateAsync(values).then((res) => {
      if (res && res?.data) {
        navigate(`/c/admin/`)
      } else {
        setNotificationText({
          text: t('common.error'),
          subText: t(`error.${res.errors}`, { defaultValue: res.errors }),
          classText: 'text-red-600'
        })
        // setErrors(res.errors)
      }
    })
    timeOutNotification()
  }

  return (
    <div className="mx-auto w-5/6 max-w-[500px] rounded-lg ring-1 bg-white ring-slate-300 px-8 py-7 shadow-md">
      <div className="pb-1">
        <h2 className="text-2xl font-semibold text-gray-900 text-center">{t('login.login')}</h2>
        <p className="mt-1 text-sm text-gray-700"></p>
      </div>
      <LoginForm onValid={onFinish} />

      <Notification
        show={showNotification}
        setShow={setShowNotification}
        text={notificationText?.text}
        subText={notificationText?.subText}
        classText={notificationText?.classText}
      />
    </div>
  )
}
