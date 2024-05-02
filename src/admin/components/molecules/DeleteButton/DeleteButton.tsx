import { useState } from 'react'

import { TrashIcon } from '@heroicons/react/24/outline'

import { Button } from '@admin/components/atoms/Button'
import { ModalConfirmDelete } from '@admin/components/atoms/ModalConfirmDelete'

type Props = {
  onClick: () => void
}

export const DeleteButton = ({ onClick }: Props) => {
  const [active, setActive] = useState(false)

  const onClose = () => {
    setActive(false)
  }

  return (
    <>
      <Button
        className="bg-white border !border-red-400 !p-1 !text-red-400 hover:!text-red-700 hover:!border-red-500"
        onClick={() => setActive(!active)}
      >
        <TrashIcon className="h-5 w-5" />
      </Button>

      {active && <ModalConfirmDelete onClose={onClose} onClickConfirm={onClick} />}
    </>
  )
}
