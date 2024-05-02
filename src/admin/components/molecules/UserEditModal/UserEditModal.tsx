import type { Dispatch, FC, SetStateAction } from 'react'
import { memo, useState } from 'react'

// import { useMutateFeedback } from '@admin/components/hooks/useMutateFeedback'
import { useTranslation } from 'react-i18next'

import type { UserInput } from '@admin/schema/user/type'
import type { AlertType } from '@admin/types'
import type { ResponsiveErrors } from '@admin/types/common'

// import { useTranslation } from 'react-i18next'

import { Alert } from '@admin/components/atoms/Alert'
import { PageTitle } from '@admin/components/atoms/PageTitle'
import { useMutateUpdateManyUser } from '@admin/components/hooks/useMutateUser'
import { useQueryUserByListId } from '@admin/components/hooks/useQueryUser'
import { ModalUserForm } from '@admin/components/organisms/ModalUserForm'
import { AlertInitialValue } from '@admin/types'
// import { KeyUser } from '@admin/types/users'

type Props = {
  setIsShowModal: (boolean: boolean) => void
  modalRef: React.RefObject<HTMLDivElement>
  listData: string[]
  setLoading: Dispatch<SetStateAction<boolean>>
}

export const UserEditModal: FC<Props> = memo(({ setIsShowModal, modalRef, listData, setLoading }) => {
  const { t } = useTranslation()

  const { mutateAsync: createMutateAsync } = useMutateUpdateManyUser()
  const { users } = useQueryUserByListId(listData)

  const [alert, setAlert] = useState<AlertType>(AlertInitialValue)

  const [errors, setErrors] = useState<ResponsiveErrors[] | null | undefined>()
  return (
    <div>
      <div className="absolute z-10 top-0 left-0 bg-white border-b border-gray-300 rounded-t-md w-full p-5">
        <PageTitle title={t('user.model.User Model', { defaultValue: 'User Model' })} />
      </div>

      <div className="mt-16">
        {alert.show && (
          <div className="mb-4">
            <Alert type={alert.type} title={alert.text} onClick={() => setAlert(AlertInitialValue)} />
          </div>
        )}
        <ModalUserForm
          setIsShowModal={setIsShowModal}
          modalRef={modalRef}
          initialValues={users as UserInput[]}
          errorsResponse={errors}
          onValid={async (values) => {
            setLoading(true)
            modalRef.current?.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            })
            await createMutateAsync(values.users).then((res) => {
              if (res.http_status === 200) {
                setAlert({
                  show: true,
                  type: 'warning',
                  text: t('user.model.Users updated', { defaultValue: 'Users updated' })
                })
              } else {
                setErrors(res.errors)
                setAlert({
                  show: true,
                  type: 'error',
                  text: t('user.model.Users update failed', { defaultValue: 'Users update failed' })
                })
              }
              setLoading(false)
            })
          }}
          isEdit={true}
        />
      </div>
    </div>
  )
})
