import { Tab } from '@headlessui/react'

import type { TabComponent as TabType } from '@admin/types/common/Tab'

import { classNames } from '@admin/utils'

export const TabComponent = ({ data }: TabType) => {
  return (
    <div>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {data.map((item) => (
            <Tab
              key={item.key}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {item.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {data.map((item, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400'
              )}
            >
              {item.render ? item.render() : <p>NONE</p>}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
