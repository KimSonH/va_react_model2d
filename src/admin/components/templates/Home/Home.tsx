import { useEffect, useState } from 'react'

import moment from 'moment'
import ReactDatePicker from 'react-datepicker'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { SelectBox } from '@admin/components/atoms/CustomSelectBox'
import { ListTitle } from '@admin/components/atoms/ListTitle'
import { PageTitle } from '@admin/components/atoms/PageTitle'
import { useQueryHomeChart } from '@admin/components/hooks/useHome'
import { useQueryAttendances } from '@admin/components/hooks/useQueryAttendances'
import { AttendanceCard } from '@admin/components/molecules/AttendanceCard'
import { ChartComponent } from '@admin/components/molecules/HomeChart/HomeChart'
import { SettingList } from '@admin/components/molecules/SettingList'
import { WebRTCPlayer } from '@admin/components/molecules/WebRTCPlayer'
import { attendancesSearchQueryState } from '@admin/states/attendances'
import { attendanceDateTimeState } from '@admin/states/attendances/attendanceDateTimeState'
import { homeChartFilterState, homeChartQueryState } from '@admin/states/home'
import { TimeFilter } from '@admin/types/home'
import { SettingListData } from '@admin/types/settings'
import { Socket, io } from 'socket.io-client'

export const Home = () => {
  const { t } = useTranslation()
  const homeChartQuery = useRecoilValue(homeChartQueryState)

  const [startDate, setStartDate] = useState(homeChartQuery.dateStart)
  const [typeFilter, setTypeFilter] = useState<string>(
    homeChartQuery.filter === 'Month' ? 'MM/yyyy' : homeChartQuery.filter === 'Year' ? 'yyyy' : 'dd/MM/yyyy'
  )
  const [filterValue, setFilterValue] = useState(homeChartQuery.filter)
  const setChartFilter = useSetRecoilState(homeChartFilterState)
  const { charts } = useQueryHomeChart(homeChartQuery)

  // const [page, setPage] = useRecoilState(attendancePageState)
  const [searchDate, setSearch] = useRecoilState(attendanceDateTimeState)

  const attendancesQuery = useRecoilValue(attendancesSearchQueryState)
  const { attendances } = useQueryAttendances(attendancesQuery)
  const attendanceFace = {
    total: attendances?.items.filter((item) => item.deleted_at === null).length,
    data: attendances?.items ?? []
  }

  const numOfferers = 3
  const [socket, setSocket] = useState<Socket>()
  const [offerers, setOfferers] = useState<string[]>(new Array(numOfferers).fill(undefined))

  const onChangeFilter = (value: TimeFilter) => {
    let format = 'dd/MM/yyyy'
    switch (value) {
      case 'Date':
        format = 'dd/MM/yyyy'
        break
      case 'Month':
        format = 'MM/yyyy'
        break
      case 'Year':
        format = 'yyyy'
        break
      default:
        break
    }
    setTypeFilter(format)
    if (startDate && moment(startDate).isValid()) {
      const dateStart = moment(startDate).endOf('d').toISOString()
      let dateQuery = {
        dateStart: '',
        dateEnd: ''
      }
      switch (value) {
        case 'Date':
          dateQuery = {
            dateStart: moment(dateStart).toISOString(),
            dateEnd: moment(dateStart).toISOString()
          }
          break
        case 'Month':
          dateQuery = {
            dateStart: moment(dateStart).startOf('month').add(1, 'd').toISOString(),
            dateEnd: moment(dateStart).endOf('month').toISOString()
          }
          break
        case 'Year':
          dateQuery = {
            dateStart: moment(dateStart).startOf('y').add(1, 'd').toISOString(),
            dateEnd: moment(dateStart).endOf('y').toISOString()
          }
          break
        default:
          break
      }
      setChartFilter({ ...dateQuery, filter: value })
    }
  }

  const handleSetDateFilter = (date: Date) => {
    setStartDate(date.toISOString())
    if (date && moment(date).isValid()) {
      const dateStart = moment(date).endOf('d').toISOString(),
        filter = filterValue
      let dateQuery = {
        dateStart: '',
        dateEnd: ''
      }
      switch (filter) {
        case 'Date':
          dateQuery = {
            dateStart: moment(dateStart).toISOString(),
            dateEnd: moment(dateStart).toISOString()
          }
          break
        case 'Month':
          dateQuery = {
            dateStart: moment(dateStart).startOf('month').add(1, 'd').toISOString(),
            dateEnd: moment(dateStart).endOf('month').toISOString()
          }
          break
        case 'Year':
          dateQuery = {
            dateStart: moment(dateStart).startOf('y').add(1, 'd').toISOString(),
            dateEnd: moment(dateStart).endOf('y').toISOString()
          }
          break
        default:
          break
      }
      setChartFilter({ filter, ...dateQuery })
    }
    // setPage(1)
    setSearch(date)
  }

  useEffect(() => {
    const socketRef = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ['websocket']
    })
    setSocket(socketRef)

    return () => {
      socketRef.disconnect()
    }
  }, [])

  useEffect(() => {
    function handleWebRTCHello(id: string, force: boolean) {
      if (force) {
        setOfferers(undefined)
      }

      if (!offerers.includes(id)) {
        const tmpOfferers = structuredClone(offerers)
        const toUpdate = offerers.findIndex((v) => v === undefined)
        tmpOfferers[toUpdate] = id
        setOfferers(tmpOfferers)
      }
    }
    socket?.on('webrtcHello', handleWebRTCHello)
    return () => {
      socket?.off('webrtcHello', handleWebRTCHello)
    }
  }, [socket, offerers])

  const settingListData: SettingListData = [
    {
      title: `${t('aside.attendance.video')} - ${numOfferers} camera(s)`,
      content: (
        <div>
          <div className="w-full flex justify-between space-y-6 xl:space-y-0 flex-wrap xl:gap-y-4">
            {offerers.map((offerer) => (
              <div className="w-full xl:w-[calc(50%-0.75rem)] bg-gray-100 rounded-[2rem]">
                <WebRTCPlayer root={socket?.id} offerer={offerer} />
              </div>
            ))}
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <PageTitle title={t('aside.dashboard', { defaultValue: 'Users' })} />
      <div className="mt-6 space-y-4 bg-gray-50 p-4 rounded-md">
        <h3 className="text-lg text-gray-700 font-semibold">{t('aside.attendance.chart')}</h3>
        <div className="flex flex-row items-center gap-4">
          <SelectBox
            className="!w-auto"
            defaultValue={homeChartQuery.filter}
            onChange={(e) => {
              onChangeFilter(e.target.value as TimeFilter)
              setFilterValue(e.target.value as TimeFilter)
            }}
          >
            {Object.entries(TimeFilter).map(([key, value]) => (
              <option key={key} value={key}>
                {t(`common.${value}`)}
              </option>
            ))}
          </SelectBox>
          <ReactDatePicker
            selected={searchDate}
            onChange={handleSetDateFilter}
            className="w-full rounded-md border-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
            showIcon
            dateFormat={typeFilter}
            showMonthYearPicker={typeFilter === 'MM/yyyy' ? true : false}
            showYearPicker={typeFilter === 'yyyy' ? true : false}
          />
        </div>
        {charts?.data.chartAttendance?.chart.some((v) => v.count > 0) ? (
          <div className="w-full flex justify-between space-y-4 xl:space-y-0 flex-wrap mt-4">
            <div className="w-full xl:w-[calc(50%-0.75rem)] bg-gray-100 p-4 rounded-md space-y-4">
              {/* Attendance chart */}
              <div id="attendanceChart">
                <ChartComponent
                  typeChart={charts?.data.chartAttendance?.typeChart}
                  chart={charts?.data.chartAttendance?.chart}
                />
              </div>
              {/* Attendance chart */}
            </div>
            <div className="w-full xl:w-[calc(50%-0.75rem)] bg-gray-100 p-4 rounded-md space-y-4">
              {/* Present / Total */}
              <div className="flex justify-end">
                <div>
                  <p className="leading-4">
                    <span className="rounded-md px-2 py-1 bg-gray-300 ">
                      {attendanceFace.total}/{attendances?.total_user_active}
                    </span>
                    <span> </span>
                    <span className="text-xs">(Present/Total)</span>
                  </p>
                </div>
              </div>
              {/* Present / Total */}
              {/* Attendance list */}
              <div
                className={`w-full overflow-auto scrollbar-thin flex flex-col gap-y-2`}
                style={{
                  minHeight:
                    window.innerWidth > 1279 && document.getElementById('attendanceChart')
                      ? document.getElementById('attendanceChart').clientHeight - 34
                      : 'auto',
                  maxHeight:
                    window.innerWidth > 1279 && document.getElementById('attendanceChart')
                      ? document.getElementById('attendanceChart').clientHeight - 34
                      : 384 - 34
                }}
              >
                {attendanceFace.data?.map((user, index) => (
                  <AttendanceCard key={index} data={user} />
                ))}
              </div>
              {/* Attendance list */}
            </div>
          </div>
        ) : (
          <div className="rounded-md p-4 mt-4 bg-gray-100 ">
            <ListTitle>{t('Attendance.No data')}</ListTitle>
          </div>
        )}
      </div>
      <SettingList data={settingListData} />
    </div>
  )
}
