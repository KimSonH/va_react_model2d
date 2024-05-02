import type { Dispatch, SetStateAction } from 'react'
import { Fragment, useMemo } from 'react'
import { NavLink } from 'react-router-dom'

import { Dialog, Transition } from '@headlessui/react'
import { ClipboardDocumentCheckIcon, CogIcon, HomeIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import logo from '@admin/assets/images/logo@2x.png'
import { classNames } from '@admin/utils'

type Props = {
  openAside: boolean
  setOpenAside: Dispatch<SetStateAction<boolean>>
}

export const Aside = ({ openAside, setOpenAside }: Props) => {
  const { t } = useTranslation()

  const navList = useMemo(
    () => [
      {
        name: t('aside.dashboard', { defaultValue: 'Dashboard' }),
        to: '',
        icon: <HomeIcon className="flex-shrink-0 h-6 w-6" aria-hidden="true" />
      },
      {
        name: t('aside.user', { defaultValue: 'User Management' }),
        to: 'user',
        icon: <UserIcon className="flex-shrink-0 h-6 w-6" aria-hidden="true" />
      },
      {
        name: t('aside.attendance.chart', { defaultValue: 'Attendance Checking' }),
        to: 'attendance',
        icon: <ClipboardDocumentCheckIcon className="flex-shrink-0 h-6 w-6" aria-hidden="true" />
      },
      {
        name: t('aside.settings', { defaultValue: 'Settings' }),
        to: 'settings',
        icon: <CogIcon className="flex-shrink-0 h-6 w-6" aria-hidden="true" />
      }
    ],
    [t]
  )

  return (
    <>
      <Transition.Root show={openAside} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpenAside}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setOpenAside(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <img src={logo} alt="Logo" className={`object-cover w-20 transform duration-500 ease-in-out`} />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul className="-mx-2 space-y-1">
                          {navList.map((nav, i) => (
                            <NavLink
                              key={i}
                              to={`/c/admin/${nav.to}`}
                              className={({ isActive }) =>
                                classNames(
                                  isActive
                                    ? 'bg-gray-50 text-indigo-600'
                                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )
                              }
                            >
                              {nav.icon}
                              {nav.name}
                            </NavLink>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-20 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <img src={logo} alt="Logo" className={`object-cover w-20 transform duration-500 ease-in-out`} />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="-mx-2 space-y-1">
                  {navList.map((nav, i) => (
                    <NavLink
                      key={i}
                      to={`/c/admin/${nav.to}`}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? 'bg-gray-50 text-indigo-600'
                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )
                      }
                    >
                      {nav.icon}
                      {nav.name}
                    </NavLink>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
