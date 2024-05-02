import type { FC } from 'react'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'

import { Transition } from '@headlessui/react'
import { CheckCircleIcon, PencilSquareIcon, TrashIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import type { User } from '@admin/types/users'

import { ModalConfirmDelete } from '@admin/components/atoms/ModalConfirmDelete'

interface Props<RecordType> {
  dataSource: User[]
  classText?: string
  dataSelect: readonly RecordType[]
  onCLickDeleteSelected: () => void
  onCLickEditSelected: () => void
  onClickSetUncheckSelected: () => void
  onClickActive: (isAll: boolean) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GroupActionSelect: FC<Props<any>> = ({
  dataSource,
  classText,
  dataSelect,
  onCLickDeleteSelected,
  onCLickEditSelected,
  onClickSetUncheckSelected,
  onClickActive
}) => {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    if (dataSelect?.length > 0) {
      setShow(true)
    } else setShow(false)
  }, [dataSelect])

  const hasFalseStatus = useCallback(() => {
    for (const id of dataSelect) {
      const matchingItem = dataSource.some((item) => item.id === id && item?.uploads?.status === false)
      if (matchingItem) {
        return false
      }
    }
    return true
  }, [dataSelect, dataSource])

  const onClose = () => {
    setShowConfirm(false)
  }
  const listButton = useMemo(
    () => [
      {
        className:
          'min-w-fit flex rounded-md gap-2 md:pr-3 items-center text-white hover:bg-indigo-600 p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        title: <p className="text-sm">{t('common.edit')}</p>,
        icon: <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />,
        onCLick: onCLickEditSelected
      },
      {
        className: `min-w-fit flex rounded-md gap-2 md:pr-3 items-center text-white hover:bg-indigo-600 p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          !hasFalseStatus() && 'disabled:!text-gray-400'
        }`,
        title: <p className="text-sm">{t('common.Active')}</p>,
        icon: <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />,
        onCLick: () => onClickActive(true),
        disable: !hasFalseStatus()
      },
      {
        className: `min-w-fit flex rounded-md text-white hover:bg-indigo-600 p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          !hasFalseStatus() && 'disabled:!text-gray-400'
        }`,
        title: <p className="text-sm">{t('common.Inactive')}</p>,
        icon: <XCircleIcon className="h-5 w-5" aria-hidden="true" />,
        onCLick: () => onClickActive(false),
        disable: !hasFalseStatus()
      },
      {
        className:
          'min-w-fit flex rounded-md gap-2 items-center text-white bg-red-500 hover:bg-red-600 p-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
        title: <p className="text-sm">{t('common.delete')}</p>,
        icon: <TrashIcon className="h-5 w-5" aria-hidden="true" />,
        onCLick: () => setShowConfirm(true)
      }
    ],
    [t, onCLickEditSelected, hasFalseStatus, onClickActive]
  )

  return (
    <>
      <div
        aria-live="assertive"
        className={`${!showConfirm && 'pointer-events-none'} fixed inset-0 flex px-4 py-6 items-end sm:p-6 z-[31]`}
      >
        <div className="flex w-full flex-col items-center space-y-4">
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto flex rounded-lg bg-indigo-500 shadow-lg max-w-[70vw]">
              <div className="gap-2 items-center px-2 py-2 border-r border-white text-white flex md:w-[150px] w-fit align-middle">
                <button
                  type="button"
                  className="flex rounded-md items-center hover:bg-indigo-600 p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={onClickSetUncheckSelected}
                >
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>

                <p className={`text-sm font-medium break-keep min-w-fit ${classText}`}>
                  <span className="hidden md:contents">{t('common.Selected')}: </span>({dataSelect.length})
                </p>
              </div>
              <div className="w-[calc(100%-68px)] md:w-[calc(100%-130px)] text-white overflow-x-auto scrollbar-thin px-2 py-1 align-middle flex items-center gap-2">
                {listButton?.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    className={item.className}
                    onClick={item.onCLick}
                    disabled={item?.disable}
                  >
                    {item.icon}
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          </Transition>
        </div>

        {showConfirm && <ModalConfirmDelete onClose={onClose} onClickConfirm={onCLickDeleteSelected} />}
      </div>
    </>
  )
}
