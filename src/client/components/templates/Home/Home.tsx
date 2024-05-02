import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { DialogAttendance } from '@client/components/organisms/DialogAttendance'
import { ConversationTemplate } from '@client/components/templates/ConversationTemplate'
import { ModelTemplate } from '@client/components/templates/ModelTemplate'
import { ProfileTemplate } from '@client/components/templates/ProfileTemplate'
import { getLanguageFromLocalStorage } from '@client/utils'

export const HomeTemplate = () => {
  const { i18n } = useTranslation()
  const language = getLanguageFromLocalStorage()

  const [open, setOpen] = useState(false)
  useEffect(() => {
    i18n.changeLanguage(language.toLocaleLowerCase())
  }, [i18n, language])

  return (
    <>
      <div className="flex w-full p-2 h-full relative">
        <ModelTemplate setOpen={setOpen} />
        <ConversationTemplate />
        <ProfileTemplate />
      </div>
      <DialogAttendance open={open} setOpen={setOpen} />
    </>
  )
}
