import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import type { Admin } from '@admin/types/admin/type'
import type { TabComponent as Tab } from '@admin/types/common/Tab'

import backgroundImage from '@admin/assets/images/bg_main_pc1200.jpg'
import { TabComponent } from '@admin/components/atoms/Tab'
import { useQueryAdmin } from '@admin/components/hooks/useQueryAdmin'
import { ProfileForm } from '@admin/components/organisms/ProfileForm'

export const Profile = () => {
  const { t } = useTranslation()
  const { admin } = useQueryAdmin() as { admin: Admin }
  const [categories] = useState<Tab>({
    data: [
      {
        key: 'profile',
        className: '',
        title: t('profile.profile'),
        render: () => <ProfileForm initialValues={admin} />
      }
    ]
  })
  return (
    <>
      <div>
        <div
          className="p-2 mb-8 flex flex-row gap-4 flex-wrap justify-center sm:justify-start"
          style={{
            backgroundImage: `url(${backgroundImage})`
          }}
        >
          <div className="bg-white rounded-lg">
            <svg
              className={`object-cover rounded-lg w-32 h-32 border text-gray-300`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>

          <div className="text-base leading-6 text-white flex items-end">
            <p className="font-semibold">
              <span className="font-bold">{admin.email}</span>
              <br />
              {admin.first_name} {admin.last_name}
            </p>
          </div>
        </div>
      </div>
      <TabComponent data={categories.data} />
    </>
  )
}
