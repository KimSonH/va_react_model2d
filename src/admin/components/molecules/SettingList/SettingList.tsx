import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'

import type { SettingListData } from '@admin/types/settings'

type Props = {
  data: SettingListData
}

export const SettingList = ({ data }: Props) => {
  return (
    <div className="w-full pt-2">
      <div className="w-full rounded-2xl bg-white">
        {data.map((item, index) => (
          <Disclosure key={index} as="div" className={`${index > 0 && 'mt-4'}`}>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={`flex w-full justify-between bg-gray-100 p-4 text-left text-sm font-semibold text-gray-500 hover:bg-gray-200 focus:outline-none focus-visible:ring ${
                    open ? 'rounded-tl-lg rounded-tr-lg' : 'rounded-lg'
                  }`}
                >
                  <span>{item.title}</span>
                  <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-500`} />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel>
                    <div className="p-4 rounded-bl-lg rounded-br-lg border border-gray-200">{item.content}</div>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  )
}
