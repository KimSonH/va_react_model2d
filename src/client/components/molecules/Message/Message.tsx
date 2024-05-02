import type { FC } from 'react'

import { Avatar } from '@client/components/atoms/Avatar'
import { stringDatetimeFormat } from '@client/utils'

type Props = {
  avatar?: string
  displayName: string
  createdAt: string
  message: string
}

export const Message: FC<Props> = ({ avatar = undefined, displayName, createdAt, message }) => {
  return (
    <div
      className={`chat-message px-4 py-2 shadow rounded-lg my-2 ${displayName !== 'Hiyori' ? 'bg-[#749bf0] text-white' : 'bg-[#f1f1f1] text-gray-600'
        }`}
    >
      <div className={`flex items-center justify-between flex-wrap ${displayName !== 'Hiyori' && 'flex-row-reverse'}`}>
        <div className={`flex items-center flex-row ${displayName !== 'Hiyori' && 'flex-row-reverse'}`}>
          <Avatar
            className="object-cover h-8 w-8 rounded-full bg-white"
            src={avatar ? `${import.meta.env.VITE_AVATAR_DOMAIN}${avatar}` : undefined}
            alt={`${displayName}`}
          />
          <div className="ml-3">
            <div className="text-base font-bold">{displayName === 'Hiyori' ? 'ひより' : displayName}</div>
          </div>
        </div>
        <div className="text-sm whitespace-nowrap">
          <time>{stringDatetimeFormat(createdAt)}</time>
        </div>
      </div>

      <div className="mt-4 space-y-6 text-sm [overflow-wrap:anywhere] [word-break:break-word]">
        <p className="[overflow-wrap:anywhere] [word-break:break-word]">{message}</p>
      </div>
    </div>
  )
}
