import { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'

import { DateTimePicker } from '@admin/components/atoms/DateTimePicker'
import { PageTitle } from '@admin/components/atoms/PageTitle'
import { useQueryAttendances } from '@admin/components/hooks/useQueryAttendances'
import { GroupButtonInList } from '@admin/components/molecules/GroupButtonInList'
import { Table } from '@admin/components/molecules/Table'
import { attendancesSearchQueryState } from '@admin/states/attendances'
import { attendanceDateTimeState } from '@admin/states/attendances/attendanceDateTimeState'
import { attendanceLimitState } from '@admin/states/attendances/attendanceLimitState'
import { attendancePageState } from '@admin/states/attendances/attendancePageState'
import { AttendanceTableColumns } from '@admin/static/TableColums/AttendanceColums'
import { stringDate } from '@admin/utils'

export const Attendance = () => {
  const { t } = useTranslation()

  // param query attendance
  const [page, setPage] = useRecoilState(attendancePageState)
  const [limit, setLimit] = useRecoilState(attendanceLimitState)
  const [searchDate, setSearch] = useRecoilState(attendanceDateTimeState)
  const attendancesQuery = useRecoilValue(attendancesSearchQueryState)

  // query users
  const { attendances, refetch } = useQueryAttendances(attendancesQuery)

  //declare column of user table
  const { Columns } = AttendanceTableColumns({
    t,
    dataAttendances: attendances?.items
  })

  // state
  const [loading, setLoading] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <PageTitle title={`${t('aside.attendance.chart')} (${t('common.Time')}: ${stringDate(searchDate)})`} />
        <div className="py-4">
          <div className="flex items-center gap-3 justify-between pb-6 flex-wrap">
            <div className="flex items-start max-w-xs w-full pr-4 sm:pr-0">
              <DateTimePicker
                onChange={(value: Date) => {
                  setSearch(value)
                  setPage(1)
                }}
                defaultValue={searchDate}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-x-8 lg:ml-40">
                <GroupButtonInList
                  onCLickRefetch={() => {
                    setLoading(true)
                    refetch().then(() => setLoading(false))
                  }}
                />
              </div>
            </div>
          </div>
          <Table
            loading={loading}
            className={'rounded-lg border'}
            columns={Columns}
            dataSource={attendances?.items}
            pagination={{
              page: page,
              limit: limit,
              setPage: setPage,
              setLimit: setLimit,
              totalCount: attendances?.total_record || 0
            }}
          />
        </div>
      </div>
    </div>
  )
}
