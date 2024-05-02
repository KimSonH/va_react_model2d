type Params = {
  currentPage: number
  totalCount: number
  limit: number
}

export const usePagination = ({ currentPage, totalCount, limit }: Params) => {
  let totalPages = Math.ceil(totalCount / limit) // Calculate total pages
  let startIndex = Math.max(currentPage - 4, 1) // Calculate start index for the array of pages
  const endIndex = Math.min(startIndex + 8, totalPages) // Calculate end index for the array of pages

  if (endIndex === totalPages) {
    startIndex = Math.max(endIndex - 8, 1)
  }

  const pages = Array.from({ length: 9 }, (_, i) => startIndex + i).filter((page) => page <= totalPages)

  if (totalPages === 0) {
    totalPages = 1
  }

  return {
    totalPages,
    pages
  }
}
