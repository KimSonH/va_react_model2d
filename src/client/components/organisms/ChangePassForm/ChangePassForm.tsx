import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Notification } from '@admin/components/atoms/NotificationInHeader'
import { Button } from '@client/components/atoms/Button'
import { useMutateChangePassword } from '@client/components/hooks/useMutateUser'
import { TextboxWithIconEye } from '@client/components/molecules/TextboxWithIconEye'
import { ChangePasswordInputSchema, type ChangePasswordInput } from '@client/schema/ChangePassword'

type Values = ChangePasswordInput

type Props = {
  onCancel: () => void
}

const defaultValues: Values = {
  newPassword: '',
  confirmPassword: '',
  currentPassword: ''
}

export const ChangePassForm = ({ onCancel }: Props) => {
  const { mutateAsync } = useMutateChangePassword()
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty }
  } = useForm({
    defaultValues: { ...defaultValues },
    resolver: zodResolver(ChangePasswordInputSchema)
  })
  const [showNotification, setShowNotification] = useState<boolean>(false)
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

  const onFinish = async (values: Values) => {
    await mutateAsync(values).then((res) => {
      if (res && res?.data) {
        setNotificationText({
          text: t('common.success'),
          subText: t(`success.${res.message}`, { defaultValue: res.message }),
          classText: 'text-green-600'
        })
        reset()
      } else {
        setNotificationText({
          text: t('common.error'),
          subText: t(`error.${res.errors}`, { defaultValue: res.errors }),
          classText: 'text-red-600'
        })
      }
    })
    timeOutNotification()
  }

  return (
    <>
      <p className="mt-6 font-bold text-xl text-gray-800">Change Password</p>
      <Notification
        show={showNotification}
        setShow={setShowNotification}
        text={notificationText?.text}
        subText={notificationText?.subText}
        classText={notificationText?.classText}
      />
      <form className="mt-4 h-full justify-between flex flex-col" onSubmit={handleSubmit(onFinish)}>
        <div className="grid grid-cols-1 gap-y-3 sm:gap-y-6">
          <TextboxWithIconEye
            labelProps={{ children: t('front.home.form.currentPassword') }}
            textboxProps={register('currentPassword')}
            error={errors.currentPassword?.message || errors.root?.currentPassword?.message}
            isRequired
          />

          <TextboxWithIconEye
            labelProps={{ children: t('front.home.form.newPassword') }}
            textboxProps={register('newPassword')}
            error={errors.newPassword?.message || errors.root?.newPassword?.message}
            isRequired
          />

          <TextboxWithIconEye
            labelProps={{ children: t('front.home.form.confirmPassword') }}
            textboxProps={register('confirmPassword')}
            error={errors.confirmPassword?.message || errors.root?.confirmPassword?.message}
            isRequired
          />
        </div>

        <div className="w-full flex justify-between gap-4 mt-2">
          <Button
            type="button"
            onClick={onCancel}
            className="mt-1 w-1/2 !bg-transparent !text-indigo-600 !border-indigo-600"
          >
            {t('common.cancel')}
          </Button>
          <Button type="submit" className="mt-1 w-1/2" disabled={!isDirty || isSubmitting}>
            {t('common.update')}
          </Button>
        </div>
      </form>
    </>
  )
}
