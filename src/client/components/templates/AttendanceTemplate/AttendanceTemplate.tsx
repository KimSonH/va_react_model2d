import { Suspense } from 'react'

import { Loading } from '@admin/components/atoms/Loading'
import { RedirectErrorBoundary } from '@client/components/molecules/RedirectErrorBoundary'
// import { Attendance } from '@client/components/organisms/Attendance'

export const AttendanceTemplate = () => {
  return (
    <div className="w-1/3 md:block hidden">
      <RedirectErrorBoundary path="/">
        <Suspense fallback={<Loading className="mt-20" />}>
          {/* <Attendance /> */}
        </Suspense>
      </RedirectErrorBoundary>
    </div>
  )
}
