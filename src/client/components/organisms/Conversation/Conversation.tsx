import type { FormEvent } from 'react'
import { useCallback, useState } from 'react'

import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import type { ConversationMessageType } from '@client/types/conversation'

import { Loading } from '@client/components/atoms/Loading'
import { useContextHook } from '@client/components/hooks/useContextHook'
import { Message } from '@client/components/molecules/Message'
import { lastIdState } from '@client/states/Messages'
import { classNames } from '@client/utils'

export const Conversation = () => {
  const { t } = useTranslation()
  const setLastId = useSetRecoilState(lastIdState)
  const { socketRef, conversationMessages, setConversationMessages, isPending, setIsPending, isLoading, setIsLoading, callApiMessage } = useContextHook()

  // const messagesRef = useRef<HTMLDivElement>(null)
  const [comment, setComment] = useState('')

  const sendMessage = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (comment.length > 0 && comment.trim() != '') {
        setIsPending(true)
        socketRef?.emit('userMessage', {
          message: comment
        })
        setConversationMessages((messages: ConversationMessageType[]) => [
          {
            message: comment,
            created_at: new Date().toString(),
            isBot: false,
            type: 'text'
          },
          ...messages
        ])
        setComment('')
      }
    },
    [comment, setConversationMessages, setIsPending, socketRef]
  )

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    // Calculate the scroll position relative to the bottom
    const scrollBottom = scrollHeight - (- scrollTop + clientHeight);
    if (scrollBottom < 10 && !isLoading && callApiMessage) {
      setLastId(conversationMessages[conversationMessages.length - 1].id)
      setIsLoading(true)
    }
  }

  return (
    <div className="w-full flex flex-col justify-between h-full sm:max-h-[93vh] max-h-[40vh] pt-2">
      <div
        className="h-full overflow-x-hidden overflow-y-auto scrollbar mb-2 -mt-2 flex flex-col-reverse"
        onScroll={handleScroll}
      >
        {conversationMessages.map((message, index) => (
          <Message
            key={index}
            message={message.message}
            createdAt={message.created_at}
            displayName={message.isBot ? 'Hiyori' : ''}
          />
        ))}
        {isLoading && <Loading className="my-10" />}
      </div>
      <div className="">
        <div className="flex space-x-2 items-center">
          <form onSubmit={sendMessage} className="grow">
            <div className="h-[3.25rem] flex items-center space-x-2 p-2 bg-slate-200 rounded-lg">
              <div className="grow">
                <input
                  className="block resize-none w-full shadow-sm focus:ring-[#5b80cf] focus:border-[#749bf0] text-gray-800 sm:text-sm border-gray-300 rounded-md"
                  placeholder={t('front.home.Conversation.Please ask me anything')}
                  maxLength={255}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onFocus={(e) => e.currentTarget.scrollIntoView()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && isPending) {
                      e.preventDefault()
                    }
                  }}
                />
              </div>
              {isPending ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-[#749bf0]"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={false}
                  className={classNames(
                    'inline-flex items-center justify-center rounded-md h-full p-2 text-white focus:outline-none bg-[#749bf0] -rotate-90'
                  )}
                  title={'Send message'}
                >
                  <PaperAirplaneIcon className="h-6 w-6 rotate-90" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
