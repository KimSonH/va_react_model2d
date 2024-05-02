import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

type Props = {
  onClose: () => void
  onClickConfirm: () => void
}

export const ModalConfirmDelete = ({ onClose, onClickConfirm }: Props) => {
  const { t } = useTranslation()
  return (
    <div aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50">
      <div className="relative w-full h-full flex items-center">
        <button type="button" className="absolute w-full h-full bg-transparent z-[51]" onClick={onClose}></button>
        <div className="relative p-4 w-full max-w-md h-full md:h-auto mx-auto z-[52]">
          <div className="relative p-4 text-center bg-white rounded-lg shadow-2xl sm:p-5">
            <button
              type="button"
              className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={onClose}
            >
              <XMarkIcon className="w-5 h-5" />
              <span className="sr-only">{t('Close modal', { defaultValue: 'common.Close modal' })}</span>
            </button>
            <TrashIcon className="text-gray-400 w-11 h-11 mb-3.5 mx-auto" />
            <p className="mb-4 text-gray-500">
              {t('common.Are you sure you want to delete this item?', {
                defaultValue: 'Are you sure you want to delete this item?'
              })}
            </p>
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={onClose}
                type="button"
                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10"
              >
                {t('common.No, cancel', { defaultValue: 'No, cancel' })}
              </button>
              <button
                type="button"
                onClick={() => {
                  onClickConfirm()
                  setTimeout(() => onClose(), 200)
                }}
                className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
              >
                {t("common.Yes, I'm sure", { defaultValue: "Yes, I'm sure" })}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
