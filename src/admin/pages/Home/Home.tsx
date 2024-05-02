import { Suspense } from 'react'

import { Loading } from '@admin/components/atoms/Loading'
import { CustomizeErrorBoundary } from '@admin/components/molecules/CustomizeErrorBoundary'
import { Home as HomeTemplate } from '@admin/components/templates/Home'

export const Home = () => {
  return (
    <main>
      <CustomizeErrorBoundary>
        <Suspense fallback={<Loading className="mt-20" />}>
          <HomeTemplate />
        </Suspense>
      </CustomizeErrorBoundary>
    </main>
  )
}
