import { useEffect, useState } from 'react'

import { CircleStackIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import type { TableProps } from '@admin/types/common/Table'

import { Loading } from '@admin/components/atoms/Loading'
import { Pagination } from '@admin/components/molecules/Pagination'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Table = ({ columns, dataSource, className, rowSelection, loading, pagination }: TableProps<any>) => {
  const { t } = useTranslation()
  const [checkedItems, setCheckedItems] = useState<string[]>([])

  const getPropertyByPath = (obj: any, path: string) => {
    return path.split('.').reduce((o, p) => o?.[p], obj)
  }

  useEffect(() => {
    if (rowSelection?.selections) setCheckedItems([...rowSelection?.selections])
  }, [rowSelection?.selections])

  const handleCheckboxChange = (item: string) => {
    let listChecked = [...checkedItems]
    if (checkedItems.includes(item)) {
      listChecked = checkedItems.filter((checkedItem) => checkedItem !== item)
    } else {
      listChecked = [...checkedItems, item]
    }

    rowSelection?.onChange(listChecked)
    setCheckedItems([...listChecked])
  }

  const handleCheckAllData = (isCheck: boolean) => {
    if (!isCheck) {
      let listId
      if (rowSelection?.keyCheck) {
        const newList = dataSource?.filter((item) => getPropertyByPath(item, rowSelection.keyCheck as string))
        listId = newList?.map((item) => item.id) as string[]
      } else {
        listId = dataSource?.map((item) => item.id) as string[]
      }
      if (listId.length > 0) {
        rowSelection?.onChange(listId)
        setCheckedItems([...listId])
      }
    } else {
      rowSelection?.onChange([])
      setCheckedItems([])
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="overflow-auto scrollbar max-w-full md:max-h-[60vh] max-h-[45vh] shadow rounded-lg">
            <table className={`${className} min-w-full divide-y divide-gray-300`}>
              <thead className="bg-gray-100">
                <tr>
                  {rowSelection && (
                    <th className={`px-3 py-3.5 text-left text-sm font-semibold text-gray-900`}>
                      <input
                        type="checkbox"
                        checked={
                          rowSelection?.keyCheck
                            ? checkedItems?.length > 0 &&
                              checkedItems.length ===
                                dataSource?.filter((item) => getPropertyByPath(item, rowSelection.keyCheck as string))
                                  ?.length
                            : checkedItems?.length > 0 && checkedItems.length === dataSource?.length
                        }
                        onChange={() =>
                          handleCheckAllData(
                            rowSelection?.keyCheck
                              ? checkedItems?.length > 0 &&
                                  checkedItems.length ===
                                    dataSource?.filter((item) =>
                                      getPropertyByPath(item, rowSelection.keyCheck as string)
                                    )?.length
                              : checkedItems?.length > 0 && checkedItems.length === dataSource?.length
                          )
                        }
                      />
                    </th>
                  )}
                  {columns?.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className={`${column?.className} px-3 py-3.5 text-left text-sm font-semibold text-gray-900`}
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {(dataSource?.length ? dataSource?.length > 0 : false) ? (
                  dataSource?.map((data, index) => (
                    <tr
                      key={index}
                      className={`duration-500 ease-in-out ${checkedItems.includes(data.id) && 'bg-blue-100'}`}
                    >
                      {rowSelection && (
                        <td className={`px-3 py-4 text-sm text-gray-500 w-[10px]`}>
                          <input
                            type="checkbox"
                            className="disabled:bg-gray-300"
                            checked={
                              rowSelection?.keyCheck
                                ? // ? !!dataSource[index][`${rowSelection.keyCheck}`] &&
                                  !!getPropertyByPath(dataSource[index], rowSelection.keyCheck as string) &&
                                  checkedItems.includes(dataSource[index].id)
                                : checkedItems.includes(dataSource[index].id)
                            }
                            onChange={() => handleCheckboxChange(dataSource[index].id)}
                            disabled={
                              rowSelection?.keyCheck
                                ? !getPropertyByPath(dataSource[index], rowSelection.keyCheck as string)
                                : false
                            }
                          />
                        </td>
                      )}
                      {columns?.map((column) => (
                        <td key={column.key} className={`${column.className} px-3 py-4 text-sm text-gray-500`}>
                          {column.render ? (
                            column.render(dataSource[index][`${column.dataIndex}`], dataSource[index], index)
                          ) : (
                            <p>{data[`${column.dataIndex}`]}</p>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-3 py-6 text-sm text-gray-500 w-full" colSpan={1000}>
                      <div className="flex w-full flex-col items-center">
                        <CircleStackIcon className="w-10 h-10 text-gray-200" />
                        <p className="pt-2 text-base text-gray-400 font-semibold">
                          {t('No data', { defaultValue: 'No Data' })}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            page={pagination.page}
            setPage={pagination.setPage}
            setLimit={pagination.setLimit}
            limit={pagination.limit}
            totalCount={pagination.totalCount}
          />
        </>
      )}
    </>
  )
}
