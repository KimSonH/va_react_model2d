export const Loading = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`${className} flex justify-center space-x-4`}>
      <div className="animate-spin h-8 w-8 bg-blue-300 rounded-xl"></div>
      <div className="animate-spin h-8 w-8 bg-blue-300 rounded-xl"></div>
      <div className="animate-spin h-8 w-8 bg-blue-300 rounded-xl"></div>
    </div>
  )
}
