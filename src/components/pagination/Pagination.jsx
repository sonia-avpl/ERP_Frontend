import React from 'react'

const Pagination = ({setPage,page,totalPages}) => {
  return (
    <div className="flex justify-end gap-2 mt-4 ">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1 text-xs font-medium text-gray-700">{`Page ${page} of ${totalPages}`}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
  )
}

export default Pagination