import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Notification } from '@admin/components/atoms/NotificationInHeader'
import { Button } from '@client/components/atoms/Button'
import { useMutateUpdateProfile } from '@client/components/hooks/useMutateUser'
import { TextboxWithTitle } from '@client/components/molecules/TextboxWithTitle'
import { UserInformationInputSchema, type UserInformationInput } from '@client/schema/UserInformation'

type Values = UserInformationInput

type Props = {
  initialValues: Partial<Values>
  onCancel: () => void
}

const defaultValues: Values = {
  email: '',
  first_name: '',
  last_name: ''
}

export const UserInformation = ({ initialValues, onCancel }: Props) => {
  const { mutateAsync } = useMutateUpdateProfile()
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty }
  } = useForm({
    defaultValues: { ...defaultValues, ...initialValues },
    resolver: zodResolver(UserInformationInputSchema)
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

  useEffect(() => {
    if (isSubmitSuccessful && initialValues) {
      reset({ ...initialValues })
    }
  }, [initialValues, isSubmitSuccessful, reset])

  return (
    <>
      <p className="mt-6 font-bold text-xl text-gray-800">Change Information</p>
      <Notification
        show={showNotification}
        setShow={setShowNotification}
        text={notificationText?.text}
        subText={notificationText?.subText}
        classText={notificationText?.classText}
      />
      <form className="mt-4 h-full justify-between flex flex-col" onSubmit={handleSubmit(onFinish)}>
        <div className="grid grid-cols-1 gap-y-3 sm:gap-y-6">
          <TextboxWithTitle
            disabled={true}
            labelProps={{ children: t('front.home.form.mail') }}
            textboxProps={register('email')}
            error={errors.email?.message || errors.root?.email?.message}
            isRequired
          />

          <TextboxWithTitle
            labelProps={{ children: t('front.home.form.first_name') }}
            textboxProps={register('first_name')}
            error={errors.first_name?.message || errors.root?.first_name?.message}
            isRequired
          />

          <TextboxWithTitle
            labelProps={{ children: t('front.home.form.last_name') }}
            textboxProps={register('last_name')}
            error={errors.last_name?.message || errors.root?.last_name?.message}
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
