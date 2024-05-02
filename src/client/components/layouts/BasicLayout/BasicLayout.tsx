import { useEffect, useLayoutEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import '@client/styles/App.css'
import { useTranslation } from 'react-i18next'

import { getUserFromLocalStorage, getUserLanguageFromLocalStorage } from '@client/components/hooks/useQueryUser'

type Props = {
  children: React.ReactNode
}

export const BasicLayout: React.FC<Props> = ({ children }) => {
  const { pathname, hash } = useLocation()
  const user = getUserFromLocalStorage()
  const { i18n } = useTranslation()
  const language = getUserLanguageFromLocalStorage()

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [pathname, hash])

  useEffect(() => {
    i18n.changeLanguage(language.toLocaleLowerCase())
  }, [i18n, language])

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
