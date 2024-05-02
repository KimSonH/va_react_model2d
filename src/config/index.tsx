import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { AppAdmin } from '@/admin/pages/App'
import { AppClient } from '@/client/pages/App'
import enJson from '@/locales/en.json'
import jaJson from '@/locales/ja.json'

i18n.use(initReactI18next).init({
  resources: {
    ja: {
      translation: jaJson
    },
    en: {
      translation: enJson
    }
  },
  // lng: 'ja',
  lng: 'ja',
  fallbackLng: 'ja',
  interpolation: { escapeValue: false }
})

export const RouterConfig: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/c/admin/*" element={<AppAdmin />} />
          <Route path="/*" element={<AppClient />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
