import { Suspense } from 'react'

import { Loading } from '@admin/components/atoms/Loading'
import { CustomizeErrorBoundary } from '@admin/components/molecules/CustomizeErrorBoundary'
import { Users as UserTemplate } from '@admin/components/templates/User'

export const Users = () => {
  return (
    <main>
      <CustomizeErrorBoundary>
        <Suspense fallback={<Loading className="mt-20" />}>
          <UserTemplate />
        </Suspense>
      </CustomizeErrorBoundary>
    </main>
  )
}
