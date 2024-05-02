import { Suspense, useRef, useState } from 'react'

import { Portal } from '@headlessui/react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'

import type { Admin } from '@admin/types/admin/type'

import { PageTitle } from '@/admin/components/atoms/PageTitle'
import { CloseModalButton } from '@admin/components/atoms/CloseModalButton'
import { Loading } from '@admin/components/atoms/Loading'
import { Notification } from '@admin/components/atoms/Notification'
import { useMutateRegControl } from '@admin/components/hooks/useMutateAdmin'
import { useMutateChangeActiveUser, useMutateDeleteManyUser } from '@admin/components/hooks/useMutateUser'
import { useQueryAdmin } from '@admin/components/hooks/useQueryAdmin'
import { useQueryUsers } from '@admin/components/hooks/useQueryUser'
import { CustomizeErrorBoundary } from '@admin/components/molecules/CustomizeErrorBoundary'
import { GroupActionSelect } from '@admin/components/molecules/GroupActionSelect'
import { GroupButtonInList } from '@admin/components/molecules/GroupButtonInList'
import { Table } from '@admin/components/molecules/Table'
import { TextboxForSearch } from '@admin/components/molecules/TextboxForSearch'
import { UserEditModal } from '@admin/components/molecules/UserEditModal'
import { UserAddModal } from '@admin/components/molecules/UserModal'
import { usersSearchQueryState } from '@admin/states/users'
import { usersLimitState } from '@admin/states/users/userLimitState'
import { usersSearchState } from '@admin/states/users/userSearchState'
import { usersPageState } from '@admin/states/users/usersPageState'
import { UserTableColumns } from '@admin/static/TableColums'

export const Users = () => {
  const { t } = useTranslation()
  const { admin } = useQueryAdmin() as { admin: Admin }
  const modalRef = useRef<HTMLDivElement>(null)

  // param query users
  const [page, setPage] = useRecoilState(usersPageState)
  const [limit, setLimit] = useRecoilState(usersLimitState)
  const [searchState, setSearch] = useRecoilState(usersSearchState)
  const usersQuery = useRecoilValue(usersSearchQueryState)
  // query users
  const { users, refetch } = useQueryUsers(usersQuery)

  // state
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState(searchState || '')
  const [listSelection, setListSelection] = useState<string[]>([])

  // mutate
  const { mutateAsync: mutateAsyncDelete } = useMutateDeleteManyUser()
  const { mutateAsync: mutateAsyncChangeActive } = useMutateChangeActiveUser()
  const { mutateAsync: mutateAsyncRegControl } = useMutateRegControl()

  // show notification
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const [notificationText, setNotificationText] = useState<{
    text: string
    subText?: string
    className: string
    Icon: React.ForwardRefExoticComponent<
      Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
        title?: string
        titleId?: string
      } & React.RefAttributes<SVGSVGElement>
    >
  } | null>(null)
  const timeOutNotification = () => {
    setShowNotification(true)

    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  // handle open edit user
  const onCLickOpenEditModal = (data: string[]) => {
    setListSelection(data)
    setShowModal(true)
  }

  // handle select user
  const onSelectChange = (newSelectedRowKeys: string[]) => {
    setListSelection(newSelectedRowKeys)
  }

  // handle delete single user
  const onCLickDeleteData = async (ids: string[]) => {
    setLoading(true)
    await mutateAsyncDelete(ids).then((res) => {
      if (!res.errors) {
        setNotificationText({
          text: t('user.User delete success', { defaultValue: 'User delete success' }),
          className: 'h-6 w-6 text-green-400',
          Icon: CheckCircleIcon
        })
        setListSelection([])
      } else {
        setNotificationText({
          text: t('user.User delete failed', { defaultValue: 'User delete failed' }),
          className: 'h-6 w-6 text-red-400',
          Icon: XCircleIcon
        })
      }

      setLoading(false)
    })

    timeOutNotification()
  }

  // handle change active of user
  const onChangeActive = async (isActive: boolean, data?: string[]) => {
    setLoading(true)
    await mutateAsyncChangeActive({ isActive: isActive, listData: data }).then((res) => {
      if (!res.errors) {
        setNotificationText({
          text: t('common.success', { defaultValue: 'Success' }),
          className: 'h-6 w-6 text-green-400',
          Icon: CheckCircleIcon
        })
        setListSelection([])
      } else {
        setNotificationText({
          text: t(`error.Something wrong`, { defaultValue: 'Something wrong' }),
          className: 'h-6 w-6 text-red-400',
          Icon: XCircleIcon
        })
      }

      setLoading(false)
    })

    timeOutNotification()
  }

  //declare column of user table
  const { Columns } = UserTableColumns({
    dataUser: users?.items,
    t,
    onCLickOpenEditModal,
    onCLickDeleteData,
    onChangeActive
  })

  //handle search
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearch(searchText)
    setPage(1)
  }

  const resetSearch = () => {
    setSearchText('')
    setSearch('')
    setPage(1)
  }

  const handleCloseModel = (value: boolean) => {
    const filteredList = users?.items?.filter(
      (item) => listSelection.includes(item.id) && item.uploads && item.uploads.status
    )
    const filteredIds = filteredList?.map((item) => item.id) as string[]
    setListSelection(filteredIds?.length > 0 ? filteredIds : [])
    setShowModal(value)
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <PageTitle title={t('aside.user', { defaultValue: 'Users' })} />
          <div className="py-4">
            <div className="flex items-center gap-3 justify-between pb-6 flex-wrap">
              <div className="flex items-start max-w-xs w-full pr-4 sm:pr-0">
                <TextboxForSearch
                  onSubmit={handleSubmit}
                  className="w-full"
                  labelProps={{
                    children: 'Search'
                  }}
                  textboxProps={{
                    className:
                      'block w-full pl-4 pr-2 py-0 bg-white shadow-none border-none focus:border-none focus:outline-0 focus:ring-0 text-sm placeholder-gray-500 sm:text-sm rounded-l-md rounded-none',
                    placeholder: t('common.Search'),
                    name: 'search',
                    value: searchText,
                    onChange: (e) => setSearchText(e.target.value)
                  }}
                  resetSearch={resetSearch}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-x-8 lg:ml-40">
                  <GroupButtonInList
                    admin={admin}
                    onCLickAdd={() => {
                      setListSelection([])
                      setShowModal(true)
                    }}
                    onCLickRefetch={() => {
                      setLoading(true)
                      refetch().then(() => setLoading(false))
                    }}
                    onCLickCamera={() => mutateAsyncRegControl({ camera: !admin.camera })}
                  />
                </div>
              </div>
            </div>
            <Table
              loading={loading}
              className={'rounded-lg border'}
              columns={Columns}
              dataSource={users?.items}
              rowSelection={{ onChange: onSelectChange, selections: listSelection }}
              pagination={{
                page: page,
                limit: limit,
                setPage: setPage,
                setLimit: setLimit,
                totalCount: users?.total_record || 0
              }}
            />
          </div>
        </div>
      </div>
      {showModal && (
        <Portal>
          <button className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50" onClick={() => {}} />
          <div className="fixed inset-0 h-fit m-auto max-h-[100vh] max-w-[90vw] bg-transparent text-left transform transition-all sm:max-w-5xl sm:w-[95%] z-50">
            <CustomizeErrorBoundary>
              <Suspense fallback={<Loading />}>
                <div className="bg-white shadow-xl rounded-lg relative">
                  <div
                    ref={modalRef}
                    className="scrollbar overflow-y-auto h-full py-4 md:py-5 px-4 md:px-4 max-h-[90vh]"
                  >
                    {listSelection.length > 0 ? (
                      <UserEditModal
                        setIsShowModal={handleCloseModel}
                        modalRef={modalRef}
                        listData={listSelection}
                        setLoading={setLoading}
                      />
                    ) : (
                      <UserAddModal setIsShowModal={setShowModal} modalRef={modalRef} setLoading={setLoading} />
                    )}
                  </div>
                </div>
                <CloseModalButton onClick={() => handleCloseModel(false)} />
              </Suspense>
            </CustomizeErrorBoundary>
          </div>
        </Portal>
      )}

      <Notification
        show={showNotification}
        setShow={setShowNotification}
        text={notificationText?.text}
        subText={notificationText?.subText}
        IconProps={{
          props: {
            className: notificationText?.className
          },
          Icon: notificationText?.Icon
        }}
      />
      <GroupActionSelect
        dataSource={users?.items}
        dataSelect={listSelection}
        onClickSetUncheckSelected={() => {
          setListSelection([])
        }}
        onCLickEditSelected={() => onCLickOpenEditModal(listSelection)}
        onCLickDeleteSelected={() => onCLickDeleteData(listSelection)}
        onClickActive={(isActive) => {
          onChangeActive(isActive, listSelection)
        }}
      />
    </>
  )
}
