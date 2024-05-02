import { useState } from 'react'

import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

const dataLimit = [10, 20, 30, 40, 50]

type Props = {
  onChange: (value: number) => void
  limit: number
}

export const SelectLimit = ({ limit, onChange }: Props) => {
  const { t } = useTranslation()
  const [active, setActive] = useState(false)

  return (
    <div>
      <div className="relative z-30">
        <button
          type="button"
          className="relative w-full cursor-default rounded-md bg-white py-1.5 px-3 text-left items-center gap-x-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm leading-6 flex"
          onClick={() => setActive(!active)}
        >
          {limit} / {t('common.Page')}
          <ChevronDownIcon
            className={`w-4 h-4 text-gray-300 transform duration-500 ease-in-out ${active && 'rotate-180'}`}
          />
        </button>

        <div
          className={`-top-[calc(100%*6-5px)] absolute z-10 w-full overflow-auto rounded-md bg-white text-base  ring-black ring-opacity-5 focus:outline-none sm:text-sm transform duration-150 overflow-y-hidden ${
            !active ? 'h-0' : 'py-1 shadow-lg ring-1'
          }`}
        >
          {dataLimit?.map((item) => (
            <button
              key={item}
              className="relative cursor-default select-none py-2 px-2 w-full flex justify-between items-center"
              onClick={() => {
                if (item !== limit) onChange(item)

                setActive(false)
              }}
            >
              <span className="text-sm leading-6">
                {item} / {t('common.Page')}
              </span>
              <CheckIcon className={`w-5 h-5 text-indigo-400 ${limit === item ? 'opacity-100' : 'opacity-0'}`} />
            </button>
          ))}
        </div>
      </div>
      {active && (
        <button
          className="h-full w-full fixed top-0 left-0 bg-transparent z-10"
          onClick={() => setActive(false)}
        ></button>
      )}
    </div>
  )
}
