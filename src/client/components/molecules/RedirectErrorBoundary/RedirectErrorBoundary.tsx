import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { ErrorBoundary } from 'react-error-boundary'

export const RedirectErrorBoundary = ({ path, children }: { path: string; children: ReactNode }) => {
  return <ErrorBoundary fallbackRender={() => <Navigate to={path} replace />}>{children}</ErrorBoundary>
}
