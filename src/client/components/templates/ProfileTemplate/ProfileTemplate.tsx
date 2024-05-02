import { Suspense } from 'react'

import { Loading } from '@admin/components/atoms/Loading'
import { RedirectErrorBoundary } from '@client/components/molecules/RedirectErrorBoundary'
import { UserProfile } from '@client/components/organisms/UserProfile'

export const ProfileTemplate = () => {
  return (
    <div className="w-1/3 md:block hidden">
      <RedirectErrorBoundary path="/">
        <Suspense fallback={<Loading className="mt-20" />}>
          <UserProfile />
        </Suspense>
      </RedirectErrorBoundary>
    </div>
  )
}
