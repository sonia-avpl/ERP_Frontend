import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const CustomTable = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
              >
                {col.Header}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-6 py-4 text-center text-gray-500"
              >
                No data found.
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.accessor} className="px-6 py-4 text-sm text-gray-800">
                    {row[col.accessor]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 flex space-x-3">
                    {onEdit && (
                      <button onClick={() => onEdit(row)} className="text-blue-500 hover:text-blue-700">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(row)} className="text-red-500 hover:text-red-700">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
