import { memo, useEffect } from 'react'

import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import type { ResponsiveErrors } from '@admin/types/common'

import { Button } from '@admin/components/atoms/Button'
import { CancelButton } from '@admin/components/atoms/CancelButton'
import { useMutateUploadAvatar } from '@admin/components/hooks/useMutateUser'
import { getAdminDomainUploadFromLocalStorage } from '@admin/components/hooks/useQueryAdmin'
import { SelectBoxWithLabel } from '@admin/components/molecules/SelectboxWithLabel'
import { TextboxWithTitle } from '@admin/components/molecules/TextboxWithTitle'
import { UploadFileWithLabel } from '@admin/components/molecules/UploadFileWithLabel'
import { UserInputSchema, type UserInput, MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from '@admin/schema/user/type'
import { Language } from '@admin/types/admin/type'

type Values = { users: UserInput[] }

type Props = {
  initialValues?: UserInput[]
  onValid: (values: Values) => Promise<void>
  setIsShowModal: (boolean: boolean) => void
  modalRef?: React.RefObject<HTMLDivElement>
  errorsResponse?: ResponsiveErrors[] | null | undefined
  isEdit?: boolean
}

const defaultValue: UserInput = { first_name: '', last_name: '', email: '', language: Language.EN, uploads: null }

export const ModalUserForm = memo(({ initialValues, onValid, setIsShowModal, errorsResponse }: Props) => {
  const { t } = useTranslation()

  const domainUpload = getAdminDomainUploadFromLocalStorage()

  const { mutateAsync } = useMutateUploadAvatar()

  const methods = useForm({
    defaultValues: {
      users: initialValues ? [...initialValues] : [{ ...defaultValue }]
    },
    mode: 'onChange',
    resolver: zodResolver(UserInputSchema)
  })
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting, isDirty, isSubmitSuccessful },
    watch,
    setError,
    getValues,
    reset
  } = methods
  const { fields, append, remove, replace, update } = useFieldArray({
    control,
    name: 'users'
  })

  const watchFieldArray = watch('users')
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index]
    }
  })

  useEffect(() => {
    if (errorsResponse && errorsResponse.length > 0) {
      const currentData = getValues()
      const temp = [] as UserInput[]

      errorsResponse.map((item) => {
        // set new data of Form
        const result = currentData.users?.find((data) => {
          return data.email === item?.value
        })
        if (result) {
          const checkExist = temp.findIndex((data) => {
            if (initialValues) return data.id === item?.value
            return data.email === item?.value
          })

          if (checkExist === -1) {
            temp.push(result)
            setError(`root.users.${temp.length - 1}.${item.field}`, { type: 'custom', message: item.message })
          } else {
            setError(`root.users.${checkExist}.${item.field}`, { type: 'custom', message: item.message })
          }
        }
      })
      replace(temp)
    } else if (errorsResponse) {
      replace([{ ...defaultValue }])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorsResponse])

  useEffect(() => {
    if (isSubmitSuccessful && initialValues?.length) {
      reset({ users: initialValues })
    }
  }, [initialValues, isSubmitSuccessful, reset])

  return (
    <FormProvider {...methods}>
      {errors.users?.message && (
        <p className="my-2 text-base text-red-600">{t(`error.${errors.users?.message}`, errors.users?.message)}</p>
      )}
      <form onSubmit={handleSubmit(onValid)}>
        {controlledFields.map((field, index) => {
          const errorForField = errors?.users?.[index]
          const errorRoot = errors?.root?.users as {
            [key: string]: {
              type: string
              message: string
            }
          }[]

          return (
            <div key={field.id} className="border border-gray-200 rounded-lg mb-10">
              <div className="border-b border-gray-200 p-3 flex justify-between items-center">
                {fields.length > 1 && !initialValues && (
                  <button type="button" onClick={() => remove(index)}>
                    <XMarkIcon className="w-4 h-4 text-gray-500" />
                  </button>
                )}
              </div>
              <p className="md:pl-5 mt-2 text-xs text-gray-500 md:text-left text-center">
                {t("user.model.Please enter the user's portrait")}
              </p>
              <div className="md:flex gap-6 p-3 pt-1 flex-grow">
                <UploadFileWithLabel
                  labelProps={{
                    children: 'Avatar'
                  }}
                  error={(errorForField?.uploads?.message as string) || errorRoot?.[index]?.uploads?.message}
                  onChange={async (e) => {
                    const files = e.currentTarget.files
                    if (files && files?.length > 0) {
                      const file = [...files][0]
                      if (file.size > MAX_FILE_SIZE) {
                        setError(`root.users.${index}.uploads`, {
                          type: 'custom',
                          message: `Max image size is 5MB.`
                        })
                      } else if (!ACCEPTED_IMAGE_TYPES.includes(file?.type)) {
                        setError(`root.users.${index}.uploads`, {
                          type: 'custom',
                          message: 'Only .jpg, .jpeg, .png and .webp formats are supported.'
                        })
                      } else {
                        const formData = new FormData()
                        formData.append('avatar', file)
                        await mutateAsync(formData).then((res) => {
                          if (res.http_status === 200) {
                            update(index, {
                              ...field,
                              uploads: {
                                id: res.data?.id as string,
                                name: res.data?.name as string,
                                status: res.data?.status as boolean,
                                user_id: res.data?.user_id as string | null
                              }
                            })
                          }
                        })
                      }
                    }
                  }}
                  image={field.uploads?.name && `${domainUpload}/${field.uploads?.name}`}
                  className="p-2 flex justify-center relative"
                />
                <div className="flex-grow space-y-6">
                  <div className="md:grid flex flex-col grid-cols-12 gap-6">
                    <TextboxWithTitle
                      className="col-span-12 sm:col-span-6"
                      labelProps={{ children: t('user.model.First Name', { defaultValue: 'First Name' }) }}
                      textboxProps={register(`users.${index}.first_name`)}
                      error={errorForField?.first_name?.message || errorRoot?.[index]?.first_name?.message}
                      isRequired
                    />
                    <TextboxWithTitle
                      className="col-span-12 sm:col-span-6"
                      labelProps={{ children: t('user.model.Last Name', { defaultValue: 'Last Name' }) }}
                      textboxProps={register(`users.${index}.last_name`)}
                      error={errorForField?.last_name?.message || errorRoot?.[index]?.last_name?.message}
                      isRequired
                    />
                  </div>
                  <div className="md:grid flex flex-col grid-cols-12 gap-6 ">
                    <TextboxWithTitle
                      className="col-span-12 sm:col-span-6"
                      disabled={initialValues ? true : false}
                      labelProps={{ children: t('user.model.Email', { defaultValue: 'Email' }) }}
                      textboxProps={register(`users.${index}.email`)}
                      error={errorForField?.email?.message || errorRoot?.[index]?.email?.message}
                      isRequired
                    />
                    <SelectBoxWithLabel
                      className="col-span-12 sm:col-span-6"
                      labelProps={{
                        children: t('common.Language', { defaultValue: 'Language' })
                      }}
                      selectBoxProps={{
                        ...register(`users.${index}.language`),
                        children: Object.entries(Language).map(([key, value]) => (
                          <option key={key} value={key}>
                            {t(`common.${value}`, { defaultValue: value })}
                          </option>
                        ))
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {!initialValues && (
          <button
            type="button"
            title={t('user.model.Add user', { defaultValue: 'Add user' })}
            className="w-full border border-dashed border-indigo-500 p-2 flex justify-center rounded-sm text-indigo-500 hover:text-indigo-700 hover:border-indigo-700"
            onClick={() => append({ ...defaultValue })}
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        )}

        <div className="flex justify-end mt-8">
          <CancelButton
            type="button"
            className="w-full sm:w-fit whitespace-pre hover:!bg-gray-200"
            onClick={() => setIsShowModal(false)}
          >
            {t('common.cancel', { defaultValue: 'Cancel' })}
          </CancelButton>
          <Button
            className="ml-2 sm:ml-3 w-full sm:w-fit whitespace-pre text-white disabled:border-transparent !bg-indigo-500 hover:text-white hover:!bg-indigo-700 disabled:!bg-gray-300"
            type="submit"
            disabled={!isDirty || isSubmitting}
          >
            {initialValues
              ? t('common.update', { defaultValue: 'Update' })
              : t('common.create', { defaultValue: 'Create' })}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
})
