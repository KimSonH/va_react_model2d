import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Loading } from '../components/atoms/Loading'
import { AdminLayout } from '../components/layouts/AdminLayout'
import { CustomizeErrorBoundary } from '../components/molecules/CustomizeErrorBoundary'

import { AuthLayout } from '@admin/components/layouts/AuthLayout'
import { Attendance } from '@admin/pages/Attendance'
import { Home } from '@admin/pages/Home'
import { Login } from '@admin/pages/Login'
import { Profile } from '@admin/pages/Profile'
import { Setting } from '@admin/pages/Setting'
import { Users } from '@admin/pages/Users'

export const RouterConfig = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <CustomizeErrorBoundary>
            <Suspense fallback={<Loading className="mt-20" />}>
              <AdminLayout />
            </Suspense>
          </CustomizeErrorBoundary>
        }
      >
        <Route index element={<Home />} />
        <Route path="user" element={<Users />} />
        <Route path="profile" element={<Profile />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="settings" element={<Setting />} />
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
      <Route path="*" element={<Navigate to="/c/admin/" replace />} />
    </Routes>
  )
}
