import type { Dispatch, FC, SetStateAction } from 'react'
import { memo, useState } from 'react'

import { useTranslation } from 'react-i18next'

import type { AlertType } from '@admin/types'

import { Alert } from '@admin/components/atoms/Alert'
import { PageTitle } from '@admin/components/atoms/PageTitle'
import { useMutateCreateManyUser } from '@admin/components/hooks/useMutateUser'
import { ModalUserForm } from '@admin/components/organisms/ModalUserForm'
import { AlertInitialValue } from '@admin/types'

type Props = {
  setIsShowModal: (boolean: boolean) => void
  modalRef: React.RefObject<HTMLDivElement>
  setLoading: Dispatch<SetStateAction<boolean>>
}

export const UserAddModal: FC<Props> = memo(({ setIsShowModal, modalRef, setLoading }) => {
  const { t } = useTranslation()

  const { mutateAsync: createMutateAsync } = useMutateCreateManyUser()

  const [alert, setAlert] = useState<AlertType>(AlertInitialValue)

  const [errors, setErrors] = useState<{ field: string; value: string; message: string }[] | null | undefined>()

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
                setErrors([])
                setAlert({
                  show: true,
                  type: 'warning',
                  text: t('user.model.Users created', { defaultValue: 'Users created' })
                })
              } else {
                setErrors(res.errors)
                setAlert({
                  show: true,
                  type: 'error',
                  text: t('user.model.Users create failed', { defaultValue: 'Users create failed' })
                })
              }
              setLoading(false)
            })
          }}
        />
      </div>
    </div>
  )
})
