import { Suspense } from 'react'

import { Loading } from '@admin/components/atoms/Loading'
import { CustomizeErrorBoundary } from '@admin/components/molecules/CustomizeErrorBoundary'
import { Profile as ProfileTemplate } from '@admin/components/templates/Profile'

export const Profile = () => {
  return (
    <main>
      <CustomizeErrorBoundary>
        <Suspense fallback={<Loading className="mt-20" />}>
          <ProfileTemplate />
        </Suspense>
      </CustomizeErrorBoundary>
    </main>
  )
}
