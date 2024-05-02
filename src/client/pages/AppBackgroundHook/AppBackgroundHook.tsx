import { Outlet } from 'react-router-dom'

import { useWebsocket } from '@client/components/hooks/useWebsocket'

export const AppBackgroundHook = () => {
  const {
    socketRef,
    conversationMessages,
    messageVoice,
    setConversationMessages,
    face,
    isPending,
    setIsPending,
    offerer,
    callApiMessage,
    isLoading,
    setIsLoading
  } = useWebsocket(import.meta.env.VITE_SOCKET_URL)

  return (
    <>
      <Outlet
        context={{
          socketRef,
          conversationMessages,
          messageVoice,
          setConversationMessages,
          face,
          isPending,
          setIsPending,
          offerer,
          callApiMessage,
          setIsLoading,
          isLoading
        }}
      />
    </>
  )
}
