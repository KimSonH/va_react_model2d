import { Fragment, useState } from 'react'

import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import type { UserInformationInput } from '@client/schema/UserInformation'

import { Notification } from '@admin/components/atoms/NotificationInHeader'
import { Button } from '@client/components/atoms/Button'
import { useMutateUpdateProfile } from '@client/components/hooks/useMutateUser'
import { Language } from '@client/types/common'

type Values = UserInformationInput

type Props = {
  initialValues: Partial<Values>
  onCancel: () => void
}

export const ChangeLanguage = ({ initialValues, onCancel }: Props) => {
  const { mutateAsync } = useMutateUpdateProfile()
  const { t, i18n } = useTranslation()
  const [selectedData, setSelectedData] = useState(initialValues.language)

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

  const onFinish = async () => {
    await mutateAsync({
      email: initialValues.email,
      first_name: initialValues.first_name,
      last_name: initialValues.last_name,
      language: selectedData
    }).then((res) => {
      if (res && res?.data) {
        i18n.changeLanguage(selectedData.toLocaleLowerCase())
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

  return (
    <>
      <p className="mt-6 font-bold text-xl text-gray-800">{t('front.home.Profile.Change Language')}</p>
      <Notification
        show={showNotification}
        setShow={setShowNotification}
        text={notificationText?.text}
        subText={notificationText?.subText}
        classText={notificationText?.classText}
      />
      <div className="mt-4 h-full justify-between flex flex-col">
        <div className="grid grid-cols-1 gap-y-3 sm:gap-y-6">
          <Listbox value={selectedData} onChange={setSelectedData}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate"> {t(`common.${selectedData}`)}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {Object.entries(Language).map(([key, value]) => (
                    <Listbox.Option
                      key={key}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                        }`
                      }
                      value={value}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {t(`common.${value}`)}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        <div className="w-full flex justify-between gap-4 mt-2">
          <Button
            type="button"
            onClick={onCancel}
            className="mt-1 w-1/2 !bg-transparent !text-indigo-600 !border-indigo-600"
          >
            {t('common.cancel')}
          </Button>
          <Button
            type="button"
            onClick={onFinish}
            className="mt-1 w-1/2"
            disabled={initialValues.language === selectedData}
          >
            {t('common.update')}
          </Button>
        </div>
      </div>
    </>
  )
}
