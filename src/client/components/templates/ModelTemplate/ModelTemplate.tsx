import type { Dispatch, SetStateAction } from 'react'

import { Bars3Icon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { ModelAssistant } from '@client/components/organisms/ModelAssistant'

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const ModelTemplate = ({ setOpen }: Props) => {
  const { t } = useTranslation()

  return (
    <div className="md:w-1/3 sm:w-1/2 w-full relative max-h-full overflow-hidden">
      <h3 className="font-bold text-lg text-center mb-2 text-gray-500 hidden md:block">{t('front.home.2D Model')}</h3>
      <div className="flex justify-end relative z-10">
        <button
          className="text-gray-400 hover:text-gray-800 md:hidden block"
          type="button"
          onClick={() => setOpen(true)}
        >
          <Bars3Icon className="h-8 w-8 " />
        </button>
      </div>
      <ModelAssistant />
    </div>
  )
}
