import { useEffect, useLayoutEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { getUserFromLocalStorage, getUserLanguageFromLocalStorage } from '@client/components/hooks/useQueryUser'

export const AuthLayout = () => {
  const { pathname, hash } = useLocation()
  const admin = getUserFromLocalStorage()
  const { i18n } = useTranslation()
  const language = getUserLanguageFromLocalStorage()

  useEffect(() => {
    i18n.changeLanguage(language.toLocaleLowerCase())
  }, [i18n, language])

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [pathname, hash])

  if (admin) {
    return <Navigate to="/c/admin/" replace />
  }
  return (
    <div className="h-screen min-w-full bg-gray-50 flex justify-center items-center">
      <Outlet />
    </div>
  )
}
