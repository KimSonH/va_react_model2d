import type { Dispatch, SetStateAction } from 'react'
import { Fragment, Suspense } from 'react'

import { Transition, Dialog } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/24/outline'

import { Loading } from '@admin/components/atoms/Loading'
import { RedirectErrorBoundary } from '@client/components/molecules/RedirectErrorBoundary'
import { UserProfile } from '@client/components/organisms/UserProfile'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const DialogAttendance = ({ open, setOpen }: Props) => {
  return (
    <div className="md:hidden block">
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10 md:hidden block" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <RedirectErrorBoundary path="/">
                      <Suspense fallback={<Loading className="mt-20" />}>
                        <UserProfile />
                      </Suspense>
                    </RedirectErrorBoundary>
                    <button
                      type="button"
                      className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                      onClick={() => setOpen(false)}
                    >
                      <XCircleIcon className="h-8 w-8" />
                    </button>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
