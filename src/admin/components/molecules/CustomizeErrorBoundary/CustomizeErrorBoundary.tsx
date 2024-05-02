import type { ReactNode } from 'react'

import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { useQueryErrorResetBoundary } from 'react-query'

import { Button } from '@/client/components/atoms/Button'
import { ListTitle } from '@/client/components/atoms/ListTitle'

export const CustomizeErrorBoundary = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation()
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ErrorBoundary
      onReset={reset}
      // onError={(error) => {
      //   // console.error(error)
      // }}
      fallbackRender={({ resetErrorBoundary }) => (
        <div className="mt-20 flex items-center justify-center flex-col">
          <ListTitle>{t('error.Unexpected error occurred')}</ListTitle>
          <Button type="button" className="mt-8" onClick={() => resetErrorBoundary()}>
            {t('common.try again')}
          </Button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}
