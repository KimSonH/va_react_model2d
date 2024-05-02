import type { ReactNode } from 'react'

import { ErrorBoundary } from 'react-error-boundary'
import { useQueryErrorResetBoundary } from 'react-query'

import { Button } from '@/client/components/atoms/Button'
import { ListTitle } from '@/client/components/atoms/ListTitle'

export const CustomizeErrorBoundary = ({ children }: { children: ReactNode }) => {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ErrorBoundary
      onReset={reset}
      // onError={(error) => {
      //   // console.error(error)
      // }}
      fallbackRender={({ resetErrorBoundary }) => (
        <div className="mt-20 flex items-center justify-center flex-col">
          <ListTitle>Unexpected error occurred</ListTitle>
          <Button type="button" className="mt-10" onClick={() => resetErrorBoundary()}>
            try Again
          </Button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}
