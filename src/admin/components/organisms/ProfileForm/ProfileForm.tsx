import { useState } from 'react'

import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import type { ProfileInput } from '@admin/schema/profile'

import { Notification } from '@admin/components/atoms/Notification'
import { useMutateUpdateProfile } from '@admin/components/hooks/useMutateAdmin'
import { SelectBoxWithLabel } from '@admin/components/molecules/SelectboxWithLabel'
import { TextboxWithTitle } from '@admin/components/molecules/TextboxWithTitle'
import { ProfileInputSchema } from '@admin/schema/profile'
import { Language } from '@admin/types/admin/type'
import { Button } from '@client/components/atoms/Button'

type Props = {
  initialValues?: ProfileInput
}

const defaultValues: ProfileInput = {
  first_name: '',
  last_name: '',
  email: '',
  language: Language.EN
}

export const ProfileForm = ({ initialValues }: Props) => {
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

  const methods = useForm({
    defaultValues: initialValues ? { ...initialValues } : { ...defaultValues },
    mode: 'onChange',
    resolver: zodResolver(ProfileInputSchema)
  })

  const { mutateAsync } = useMutateUpdateProfile()

  const handleSubmitData = async (values: ProfileInput) => {
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

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty }
    // setError
  } = methods

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <div className="flex-grow space-y-6">
            <div className="md:grid flex flex-col grid-cols-12 gap-6">
              <TextboxWithTitle
                className="col-span-12 sm:col-span-6"
                labelProps={{ children: t('user.model.First Name', { defaultValue: 'First Name' }) }}
                textboxProps={register(`first_name`)}
                error={errors.first_name?.message || errors.root?.first_name?.message}
                isRequired
              />
              <TextboxWithTitle
                className="col-span-12 sm:col-span-6"
                labelProps={{ children: t('user.model.Last Name', { defaultValue: 'Last Name' }) }}
                textboxProps={register(`last_name`)}
                error={errors.last_name?.message || errors.root?.last_name?.message}
                isRequired
              />
            </div>
            <div className="md:grid flex flex-col grid-cols-12 gap-6 ">
              <TextboxWithTitle
                className="col-span-12 sm:col-span-6"
                disabled={initialValues ? true : false}
                labelProps={{ children: t('user.model.Email', { defaultValue: 'Email' }) }}
                textboxProps={register(`email`)}
                error={errors.email?.message || errors.root?.email?.message}
                isRequired
              />
              <SelectBoxWithLabel
                className="col-span-12 sm:col-span-6"
                labelProps={{
                  children: t('common.Language', { defaultValue: 'Language' })
                }}
                selectBoxProps={{
                  ...register(`language`),
                  children: Object.entries(Language).map(([key, value]) => (
                    <option key={key} value={key}>
                      {t(`common.${value}`, { defaultValue: value })}
                    </option>
                  ))
                }}
              />
            </div>
          </div>
          <div className="flex justify-end w-full">
            <Button
              className="mt-5 w-full sm:w-fit whitespace-pre text-white disabled:border-transparent !bg-indigo-500 hover:text-white hover:!bg-indigo-700"
              type="submit"
              disabled={!isDirty || isSubmitting}
            >
              {t('common.update', { defaultValue: 'Update' })}
            </Button>
          </div>
        </form>
      </FormProvider>
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
    </>
  )
}
