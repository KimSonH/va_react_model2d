import { Suspense } from 'react'

import { Loading } from '@admin/components/atoms/Loading'
import { CustomizeErrorBoundary } from '@admin/components/molecules/CustomizeErrorBoundary'
import { Attendance as AttendanceTemplate } from '@admin/components/templates/Attendance'

export const Attendance = () => {
  return (
    <main>
      <CustomizeErrorBoundary>
        <Suspense fallback={<Loading className="mt-20" />}>
          <AttendanceTemplate />
        </Suspense>
      </CustomizeErrorBoundary>
    </main>
  )
}
