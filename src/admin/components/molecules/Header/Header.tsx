import { Fragment, memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import type { Admin } from '@admin/types/admin/type'

import { Avatar } from '@admin/components/atoms/Avatar'
import { useMutateLogout } from '@admin/components/hooks/useMutateAdmin'
import { useQueryAdmin } from '@admin/components/hooks/useQueryAdmin'
import { classNames } from '@admin/utils'

export const Header = memo(() => {
  const { admin } = useQueryAdmin() as { admin: Admin }
  const { t } = useTranslation()
  const { mutateAsync } = useMutateLogout()

  const navigate = useNavigate()

  const handleLogout = async () => {
    mutateAsync({}).finally(() => {
      navigate('/c/admin')
    })
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="-m-1.5 flex items-center p-1.5">
        <span className="sr-only">Open user menu</span>
        <Avatar
          className="object-cover h-8 w-8 rounded-full"
          labelText="Open user menu"
          src={undefined}
          alt={`user.displayName`}
        />
        <span className="hidden lg:flex lg:items-center">
          <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
            {admin.first_name} {admin.last_name}
          </span>
          <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => navigate('/c/admin/profile')}
                className={classNames(
                  active ? 'bg-gray-50' : '',
                  'block px-3 py-1 w-full text-left text-sm leading-6 text-gray-900'
                )}
              >
                <span className="font-bold">{admin.email}</span>
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleLogout}
                className={classNames(
                  active ? 'bg-gray-50' : '',
                  'block px-3 py-1 w-full text-left text-sm leading-6 text-gray-900'
                )}
              >
                {t('common.Signout', { defaultValue: 'Sign out' })}
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
    // <header className="bg-white w-full flex items-center p-5 rounded-md drop-shadow-md absolute justify-between">
    //   <button onClick={() => setOpenAside(!openAside)} className="text-gray-400 ring-1 rounded-md p-1 ring-gray-400">
    //     <ChevronLeftIcon className={`w-6 h-6 transform duration-500 ${!openAside && 'rotate-180'}`} />
    //   </button>

    //   <img
    //     src={logo}
    //     alt="Logo"
    //     className={`object-cover w-20 transform duration-500 ease-in-out opacity-100 ${
    //       openAside ? 'lg:opacity-0' : ''
    //     }`}
    //   />

    //   <ButtonWithMenu
    //     className="flex-shrink-0 relative"
    //     menuButtonProps={{
    //       children: (
    //         <div className="flex items-center">
    //           <Avatar
    //             className="object-cover h-8 w-8 rounded-full"
    //             labelText="Open user menu"
    //             src={undefined}
    //             alt={`user.displayName`}
    //           />
    //         </div>
    //       ),
    //       className: 'bg-white rounded-full flex focus:outline-none'
    //     }}
    //     menuItemsProps={{
    //       className:
    //         'origin-top-right absolute z-10 right-0 mt-2 w-48 min-w-max rounded-md rounded-tr-none shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
    //     }}
    //   >
    //     <Menu.Item>
    //       <div className="flex flex-row justify-between p-2 px-2 items-center gap-x-5">
    //         <button
    //           className="w-full text-left block text-sm text-gray-500 rounded-md p-2 hover:bg-gray-100"
    //           type="button"
    //           onClick={() => navigate('/c/admin/profile')}
    //         >
    //           <span className="font-bold">{admin.email}</span>
    //           <br />
    //           {admin.first_name} {admin.last_name}
    //         </button>
    //         <button
    //           onClick={handleLogout}
    //           type="button"
    //           title={t('common.Signout', { defaultValue: 'Sign out' })}
    //           className="w-full text-left block p-4 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-md"
    //         >
    //           <ArrowLeftOnRectangleIcon className="w-6 h-6 " />
    //         </button>
    //       </div>
    //     </Menu.Item>
    //   </ButtonWithMenu>
    // </header>
  )
})
