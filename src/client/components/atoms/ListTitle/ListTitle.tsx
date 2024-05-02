import type { FC } from 'react'

type Props = {
  children: React.ReactNode
}

export const ListTitle: FC<Props> = ({ children }) => {
  return <h2 className="text-base font-medium text-gray-900 min-w-0 flex-1 break-words break-all">{children}</h2>
}
