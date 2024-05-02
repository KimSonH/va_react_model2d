import { Suspense } from 'react'

import { Loading } from '@admin/components/atoms/Loading'
import { CustomizeErrorBoundary } from '@admin/components/molecules/CustomizeErrorBoundary'
import { Setting as SettingTemplate } from '@admin/components/templates/Setting'

export const Setting = () => {
  return (
    <main>
      <CustomizeErrorBoundary>
        <Suspense fallback={<Loading className="mt-20" />}>
          <SettingTemplate />
        </Suspense>
      </CustomizeErrorBoundary>
    </main>
  )
}
