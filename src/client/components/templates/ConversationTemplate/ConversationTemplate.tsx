import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { Conversation } from '@client/components/organisms/Conversation'

export const ConversationTemplate = () => {
  const [showChat, setShowChat] = useState(true)
  const { t } = useTranslation()

  return (
    <div className="md:w-1/3 sm:w-1/2 sm:h-full flex flex-col justify-between items-center px-4 sm:relative fixed sm:bottom-[unset] bottom-6 py-2 sm:bg-white bg-slate-500 bg-opacity-25 sm:inset-x-[unset] inset-x-2 rounded-lg z-10">
      <h3 className="font-bold text-lg text-center mb-2 text-gray-500 hidden sm:block">
        {t('front.home.Conversation.Conversation')}
      </h3>
      <button
        type="button"
        onClick={() => setShowChat(!showChat)}
        className={`block sm:hidden h-5 p-1 mb-1 relative w-1/4 animate-pulse animate-infinite ${showChat ? 'rotate-180' : 'rotate-0'
          }`}
      >
        <div className="absolute h-1 w-[50.5%] top-1 left-0 transform -rotate-[5deg] bg-white"></div>
        <div className="absolute h-1 w-[50.5%] top-3 left-0 transform -rotate-[5deg] bg-white"></div>
        <div className="absolute h-1 w-[50.5%] top-1 right-0 transform rotate-[5deg] bg-white"></div>
        <div className="absolute h-1 w-[50.5%] top-3 right-0 transform rotate-[5deg] bg-white"></div>
      </button>
      <div className={`overflow-hidden transform duration-500 h-0 ease-in-out ${showChat && 'h-fit'} sm:h-fit w-full`}>
        <Conversation />
      </div>
    </div>
  )
}
