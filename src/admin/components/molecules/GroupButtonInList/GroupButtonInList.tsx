import { useState } from 'react'

import { ArrowPathIcon, UserPlusIcon, VideoCameraIcon } from '@heroicons/react/24/outline'

import type { Admin } from '@admin/types/admin/type'

import { Button } from '@admin/components/atoms/Button'

type Props = {
  admin?: Admin
  onCLickAdd?: () => void
  onCLickRefetch: () => void
  onCLickCamera?: () => void
}

export const GroupButtonInList = ({ admin, onCLickAdd, onCLickRefetch, onCLickCamera }: Props) => {
  const [spinEffect, setSpinEffect] = useState<boolean>(false)

  return (
    <div className="flex gap-2 h-full">
      {onCLickCamera && (
        <Button
          type="button"
          onClick={onCLickCamera}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold focus:outline-none focus:ring"
        >
          <div className="relative">
            <div
              className={`${
                !admin.camera ? 'opacity-1' : 'opacity-0'
              } transition-opacity duration-200 ease-out absolute z-20 h-7 w-[0.12rem] -rotate-45 left-[32%] transform-[translate(-50%,-50%)] top-[-9%] bg-red-500`}
            ></div>
            <VideoCameraIcon className={`w-5 h-5`} />
          </div>
        </Button>
      )}
      {onCLickAdd && (
        <Button
          type="button"
          onClick={onCLickAdd}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold focus:outline-none focus:ring"
        >
          <UserPlusIcon className={`w-5 h-5`} />
        </Button>
      )}
      <Button
        type="button"
        onClick={async () => {
          setSpinEffect(true)
          onCLickRefetch()
          setTimeout(() => {
            setSpinEffect(false)
          }, 1000)
        }}
        className="flex items-center"
      >
        <div className={`${spinEffect && `animate-spin`}`}>
          <ArrowPathIcon className={`scale-x-[-1] w-5 h-5`} />
        </div>
      </Button>
    </div>
  )
}
