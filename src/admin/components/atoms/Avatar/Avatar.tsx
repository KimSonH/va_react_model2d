import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'img'> & {
  labelText?: string
}

export const Avatar = ({ labelText, src = '', alt = '', className = '', ...props }: Props) => {
  return (
    <>
      {labelText && <span className="sr-only">{labelText}</span>}
      {src ? (
        <img className={`${className}`} src={`${src}`} alt={alt} {...props} referrerPolicy="no-referrer" />
      ) : (
        <svg className={`${className} text-gray-300`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </>
  )
}
