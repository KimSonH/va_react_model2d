import React, { useState } from 'react'

import { stringDate } from '@admin/utils'

export const DateTimePicker = ({ defaultValue, onChange }: { defaultValue: Date; onChange: (value: Date) => void }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(defaultValue)

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const parsedDate = new Date(value)
    setSelectedDate(parsedDate)
    onChange(parsedDate)
  }

  return (
    <div className="flex items-center h-full text-gray-500">
      <input
        type="date"
        className="block w-full pl-4 pr-2 bg-white shadow-none h-[42px] focus:outline-0 focus:ring-0 text-sm placeholder-gray-500 sm:text-sm rounded-l-md appearance-none px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-200"
        value={stringDate(selectedDate)}
        onChange={handleDateChange}
      />
    </div>
  )
}
