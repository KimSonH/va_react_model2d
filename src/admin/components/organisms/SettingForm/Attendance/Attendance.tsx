import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useQuerySettingAttendanceTime } from '@admin/components/hooks/useQuerySetting'
import { TextboxWithTitle } from '@admin/components/molecules/TextboxWithTitle'
import { AttendanceInputSchema, type AttendanceInput } from '@admin/schema/setting'
import { Button } from '@client/components/atoms/Button'

type Props = {
  onValid: (values: AttendanceInput) => Promise<void>
}

const defaultValues: AttendanceInput = {
  time: 0,
  status: true
}

export const AttendanceForm = ({ onValid }: Props) => {
  const { t } = useTranslation()
  const { data } = useQuerySettingAttendanceTime()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, errors }
  } = useForm({
    defaultValues: { ...defaultValues, ...data },
    resolver: zodResolver(AttendanceInputSchema)
  })

  const onSubmit = async (values: AttendanceInput) => {
    return onValid(values).finally(() => reset(values))
  }

  return (
    <form className="grid grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
      <TextboxWithTitle
        className="col-span-12 sm:col-span-6"
        labelProps={{ children: t('settings.Time', { defaultValue: 'Time' }) }}
        textboxProps={{ ...register(`time`), type: 'number' }}
        error={errors.time?.message}
        isRequired
      />

      <div className="col-span-12 sm:col-span-6 flex flex-row-reverse">
        <Button className="mt-2" type="submit" disabled={!isDirty || isSubmitting}>
          {t('common.update', { defaultValue: 'Update' })}
        </Button>
      </div>
    </form>
  )
}
