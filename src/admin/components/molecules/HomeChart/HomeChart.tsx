import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'

import { TypeChart, type DataChart } from '@admin/types/home'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const ChartComponent = (props: DataChart | undefined) => {
  const { t } = useTranslation()

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        display: false
      },
      scales: {
        x: {
          stacked: true
        },
        y: {
          stacked: true
        }
      }
    }
  }
  const data = {
    labels: props?.chart?.map((data) => {
      return data.time
    }),
    datasets: [
      {
        label: t(`chart.${props?.typeChart}`),
        data: props?.chart?.map((data) => {
          return data.count ? Number(data.count) : 0
        }),
        backgroundColor: props?.typeChart === TypeChart.attendances ? 'rgba(234, 179, 8, 1)' : 'rgba(59, 130, 246, 1)'
      }
    ]
  }
  return <Bar className="w-full" options={options} data={data} />
}
