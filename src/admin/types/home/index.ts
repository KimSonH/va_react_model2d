export enum TimeFilter {
  Date = 'Date',
  Month = 'Month',
  Year = 'Year'
}

export enum TypeChart {
  attendances = 'attendances'
}

export type DateFilter = {
  dateStart: string
  dateEnd?: string
}

export type HomeQuery = DateFilter & {
  filter: TimeFilter
  timeZone?: number
}

export const homesChartQueryKey = 'homeChartKeys'

export type DataChart = {
  typeChart: TypeChart | undefined
  chart: [{ time: string; count: number }] | undefined
}

export type HomeChartQueryResponse = {
  chartAttendance: DataChart
}
