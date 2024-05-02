import type { FC } from 'react'

type Props = {
  title: string
  subTitle?: string
  customClass?: string
}

export const PageTitle: FC<Props> = ({ title, subTitle, customClass }) => {
  return (
    <div className={customClass}>
      <h2 className="leading-6 font-bold text-gray-900 text-xl">{title}</h2>
      {subTitle && <p className="mt-1 text-md text-gray-500">{subTitle}</p>}
    </div>
  )
}
