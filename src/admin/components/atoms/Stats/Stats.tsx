type Props = {
  name: string
  stat: string | number
  borderColor: string
}

export const Stats = ({ name, stat, borderColor }: Props) => {
  return (
    <div key={name} className="px-2 py-4 sm:p-5 bg-gray-50 rounded-lg">
      <dt className="text-base text-gray-500 font-semibold">{name}</dt>
      <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
        <div className={`flex items-baseline text-2xl font-semibold text-indigo-600 border-l-4 pl-2  ${borderColor}`}>
          {stat}
        </div>
      </dd>
    </div>
  )
}
