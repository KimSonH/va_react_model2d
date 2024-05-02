import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/styles/index.css'
import 'react-datepicker/dist/react-datepicker.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'

import { RouterConfig } from './config'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
      cacheTime: Infinity,
      suspense: true
    }
  }
})

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RouterConfig />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
)
