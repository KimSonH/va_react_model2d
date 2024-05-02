import { memo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import type { LoginInput } from '@client/schema/Login'

import { Button } from '@client/components/atoms/Button'
import { TextboxWithIconEye } from '@client/components/molecules/TextboxWithIconEye'
import { TextboxWithTitle } from '@client/components/molecules/TextboxWithTitle'
import { LoginInputSchema } from '@client/schema/Login'

type Values = LoginInput

type Props = {
  initialValues?: Partial<Values>
  onValid: (values: Values) => Promise<void>
}

const defaultValues: Values = {
  email: '',
  password: ''
}

export const LoginForm = memo(({ initialValues, onValid }: Props) => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: { ...defaultValues, ...initialValues },
    resolver: zodResolver(LoginInputSchema)
  })

  return (
    <form className="mt-4 grid grid-cols-1 gap-y-4 sm:gap-y-7" onSubmit={handleSubmit(onValid)}>
      <TextboxWithTitle
        labelProps={{ children: t('user.mail') }}
        textboxProps={register('email')}
        error={errors.email?.message || errors.root?.email?.message}
        isRequired
      />

      <TextboxWithIconEye
        labelProps={{ children: t('user.password') }}
        textboxProps={{ ...register('password'), type: 'password', autoComplete: 'on' }}
        error={errors.password?.message || errors.root?.password?.message}
        isRequired
      />

      <div className="w-full flex flex-row-reverse">
        <Button type="submit" className="mt-1 w-fit" disabled={isSubmitting}>
          {t('login.signin')}
        </Button>
      </div>
    </form>
  )
})
