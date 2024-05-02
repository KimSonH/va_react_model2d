import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import type { Admin } from '@admin/types/admin/type'

import { useQueryAdmin } from '@admin/components/hooks/useQueryAdmin'
import { SelectBoxWithLabel } from '@admin/components/molecules/SelectboxWithLabel'
import { ProfileInputSchema, type ProfileInput } from '@admin/schema/profile'
import { Language } from '@admin/types/admin/type'
import { Button } from '@client/components/atoms/Button'

type Props = {
  onValid: (values: ProfileInput) => Promise<void>
}

const defaultValues: ProfileInput = {
  email: '',
  first_name: '',
  last_name: '',
  language: Language.EN,
  camera: false
}

export const LanguageForm = ({ onValid }: Props) => {
  const { admin } = useQueryAdmin() as { admin: Admin }

  const { t, i18n } = useTranslation()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, isDirty }
  } = useForm({
    defaultValues: { ...defaultValues, ...admin },
    resolver: zodResolver(ProfileInputSchema)
  })

  // ToDo: will remove and implement
  useEffect(() => {
    setValue('language', i18n.language.toLocaleUpperCase() as Language)
  }, [i18n.language, setValue])

  const onSubmit = async (values: ProfileInput) => {
    return onValid(values).finally(() => reset(values))
  }

  return (
    <form className="grid grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
      <SelectBoxWithLabel
        className="col-span-12 sm:col-span-6"
        labelProps={{
          children: t('common.Language', { defaultValue: 'Language' })
        }}
        selectBoxProps={{
          ...register(`language`),
          children: Object.entries(Language).map(([key, value]) => (
            <option key={key} value={key}>
              {t(`common.${value}`, { defaultValue: value })}
            </option>
          ))
        }}
      />

      <div className="col-span-12 sm:col-span-6 flex flex-row-reverse">
        <Button className="mt-2" type="submit" disabled={!isDirty || isSubmitting}>
          {t('common.update', { defaultValue: 'Update' })}
        </Button>
      </div>
    </form>
  )
}
