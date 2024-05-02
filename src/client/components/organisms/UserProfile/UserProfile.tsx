import { useMemo, useState } from 'react'

import { Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'

import { ChangeLanguage } from '../ChangeLanguageForm'
import { ChangePassForm } from '../ChangePassForm'
import { UserInformation } from '../UserInformation'

import { IdUserMenu } from '@/client/types/common'
import { Avatar } from '@client/components/atoms/Avatar'
import { Button } from '@client/components/atoms/Button'
import { useMutateLogout } from '@client/components/hooks/useMutateUser'
import { useQueryUser } from '@client/components/hooks/useQueryUser'
import { UserMenu } from '@client/components/molecules/UserMenu'
import { getTimeJoined } from '@client/utils'

export const UserProfile = () => {
  const { t } = useTranslation()
  const { user } = useQueryUser()
  const [open, setOpen] = useState(IdUserMenu.NONE)
  const { mutateAsync } = useMutateLogout()

  const handleCloseTab = () => {
    setOpen(IdUserMenu.NONE)
  }

  const listMenu = useMemo(
    () => [
      {
        id: IdUserMenu.USER,
        component: <UserInformation initialValues={user} onCancel={handleCloseTab} />
      },
      {
        id: IdUserMenu.CHANGE_PASS,
        component: <ChangePassForm onCancel={handleCloseTab} />
      },
      {
        id: IdUserMenu.ATTENDANCE,
        component: <>ATTENDANCE</>
      },
      {
        id: IdUserMenu.LANGUAGE,
        component: <ChangeLanguage initialValues={user} onCancel={handleCloseTab} />
      }
    ],
    [user]
  )

  return (
    <div className="w-full flex flex-col  py-4 px-8 pt-2 sm:rounded-[2rem] h-full bg-[#fdefcf]">
      <div>
        <h3 className="mb-2 font-bold text-center text-lg text-gray-500">{t('front.home.User Information')}</h3>
        <div className="flex items-center mt-4 bg-white rounded-full p-2">
          <Avatar
            alt="profile-img"
            className="w-1/3 rounded-full max-w-[300px] mr-6"
            src={`${user.domain_upload}/${user.uploads.name}`}
          />
          <p className="text-start mt-2 font-normal text-base text-gray-500 truncate">
            <span className="text-gray-900 font-bold text-2xl">{user.last_name}</span>
            <br />
            {user.first_name}
          </p>
        </div>
        <div className="px-4 mt-2">
          <p className="text-sm text-gray-500 font-medium">
            Joined
            <span className="font-bold text-gray-800"> {getTimeJoined(user?.created_at)}</span>
          </p>
        </div>
      </div>

      <div className="h-full mt-6 max-w-full overflow-x-hidden overflow-y-auto scrollbar-thin">
        {listMenu?.map((item) => {
          return (
            <Transition
              key={item.id}
              appear={false}
              show={item.id === open}
              className="h-full py-2 px-4 justify-between flex flex-col bg-[#fdefcf]"
              enter="transform transition ease-in-out duration-700"
              enterFrom="translate-x-[150%]"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-200"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-[150%]"
            >
              {item.component}
            </Transition>
          )
        })}
        <Transition
          appear={true}
          show={open === IdUserMenu.NONE}
          className="h-full py-2 pl-4 justify-between flex flex-col bg-[#fdefcf]"
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <UserMenu setOpen={setOpen} />

          <div className="flex flex-col">
            <Button
              onClick={mutateAsync}
              className="!bg-[#f6f5f8] !text-indigo-600 !font-semibold w-fit hover:!bg-indigo-500 hover:!text-white"
            >
              {t('common.Signout')}
            </Button>
          </div>
        </Transition>
      </div>
    </div>
  )
}
