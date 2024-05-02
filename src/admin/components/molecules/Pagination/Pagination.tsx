import type { FC } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { SelectLimit } from '@admin/components/atoms/SelectLimit'
import { usePagination } from '@admin/components/hooks/usePagination'

type Props = {
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  page: number
  totalCount?: number
  limit?: number
}

export const Pagination: FC<Props> = ({ setPage, page: currentPage, totalCount = 0, limit = 10, setLimit }) => {
  const { t } = useTranslation()
  const { totalPages, pages } = usePagination({ currentPage, totalCount, limit })

  return (
    <div className={`${totalCount > 0 ? 'flex' : 'hidden'} items-center justify-end gap-3 py-3 flex-wrap`}>
      <p className="text-sm leading-6 font-semibold">
        {t('common.Total')}: {totalCount}
      </p>
      <SelectLimit
        limit={limit}
        onChange={(value) => {
          setLimit(value)
          setPage(1)
        }}
      />
      <div className="flex justify-end items-center sm:hidden">
        <button
          onClick={() => setPage(currentPage - 1)}
          type="button"
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-200"
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="text-sm text-gray-700 px-3">
          <span className="font-medium">{currentPage}</span> / <span className="font-medium">{totalPages}</span>
        </div>
        <button
          onClick={() => setPage(currentPage + 1)}
          type="button"
          disabled={currentPage === totalPages || totalPages === 0}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-200"
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="hidden sm:flex sm:items-center sm:justify-end flex-wrap">
        <div>
          <nav className="relative z-0 inline-flex rounded-md" aria-label="Pagination">
            <button
              onClick={() => setPage(currentPage - 1)}
              type="button"
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setPage(page)}
                type="button"
                aria-current="page"
                className={`${
                  page === currentPage
                    ? 'z-10 bg-white border-indigo-500 text-indigo-500 hover:cursor-auto'
                    : 'bg-white border-gray-200 text-gray-600 hover:text-indigo-400 hover:bg-gray-100'
                }  relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setPage(currentPage + 1)}
              type="button"
              disabled={currentPage === totalPages || totalPages === 0}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
