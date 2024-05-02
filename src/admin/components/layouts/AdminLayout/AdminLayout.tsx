import { useEffect, useLayoutEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { Bars3Icon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { getAdminFromLocalStorage, getAdminLanguageFromLocalStorage } from '@/admin/components/hooks/useQueryAdmin'
import { Aside } from '@/admin/components/molecules/Aside'
import { Header } from '@/admin/components/molecules/Header'

export const AdminLayout = () => {
  const { pathname, hash } = useLocation()
  const admin = getAdminFromLocalStorage()
  const { i18n } = useTranslation()
  const language = getAdminLanguageFromLocalStorage()

  const [openAside, setOpenAside] = useState<boolean>(false)

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [pathname, hash])

  useEffect(() => {
    i18n.changeLanguage(language.toLocaleLowerCase())
  }, [i18n, language])

  if (!admin) {
    return <Navigate to="/c/admin/login" replace />
  }

  return (
    <div>
      <Aside openAside={openAside} setOpenAside={setOpenAside} />
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between lg:justify-end gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setOpenAside(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <Header />
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
