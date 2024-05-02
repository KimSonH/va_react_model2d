import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import type { LoginInput } from '@client/schema/Login'

import { Notification } from '@admin/components/atoms/Notification'
import { useMutateLogin } from '@client/components/hooks/useMutateUser'
import { LoginForm } from '@client/components/organisms/LoginForm'

export const LoginTemplate = () => {
  const { t } = useTranslation()
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const navigate = useNavigate()
  const { mutateAsync } = useMutateLogin()

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
        navigate(`/`)
        location.reload()
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
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <LoginForm onValid={onFinish} />
        <Notification
          show={showNotification}
          setShow={setShowNotification}
          text={notificationText?.text}
          subText={notificationText?.subText}
          classText={notificationText?.classText}
        />
      </div>
    </div>
  )
}
