import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Loading } from '@admin/components/atoms/Loading'
import { CustomizeErrorBoundary } from '@admin/components/molecules/CustomizeErrorBoundary'
import { AuthLayout } from '@client/components/layouts/AuthLayout'
import { BasicLayout } from '@client/components/layouts/BasicLayout'
import { NotFound } from '@client/pages/404'
import { AppBackgroundHook } from '@client/pages/AppBackgroundHook'
import { Home } from '@client/pages/Home'
import { Login } from '@client/pages/Login'

export const RouterConfig: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <CustomizeErrorBoundary>
            <Suspense fallback={<Loading className="mt-20" />}>
              <BasicLayout>
                <AppBackgroundHook />
              </BasicLayout>
            </Suspense>
          </CustomizeErrorBoundary>
        }
      >
        <Route index element={<Home />} />
      </Route>
      <Route
        path="/"
        element={
          <CustomizeErrorBoundary>
            <Suspense fallback={<Loading className="mt-20" />}>
              <AuthLayout />
            </Suspense>
          </CustomizeErrorBoundary>
        }
      >
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
