import { useRef, useState } from "react";
import ComponentView from "./ComponentView";
import NewComponentInputForm from "../../modals/r&d/NewComponentInputForm";
import { FunnelIcon, PlusIcon } from "@heroicons/react/24/outline";

const ComponentTableView = ({ data,refetch }) => {
  const [newComponent, setNewComponent] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const viewRef = useRef(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleViewClick = (item) => {
    setSelectedComponent(item);
    setTimeout(() => {
      viewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100); // slight delay to ensure ComponentView renders before scroll
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-white rounded shadow my-10">
      
    <div className="font-semibold mb-4 text-gray-700">
  {/* Header Row with Flex */}
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-2xl font-semibold text-gray-800">
      Components Detailed View
    </h3>
    <button
      onClick={() => setNewComponent(true)}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
    >
      <PlusIcon className="w-5 h-5" /> New Component
    </button>
  </div>
   <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1 text-sm px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded mb-2"
        >
          <FunnelIcon className="h-4 w-4" /> Filter
        </button>

  {/* Table */}
  <table className="min-w-full table-auto border border-gray-300 rounded-lg shadow-sm text-center">
    <thead>
      <tr className="bg-gray-100">
        <th className="px-4 py-2 font-medium border">Image</th>
        <th className="px-4 py-2 font-medium border">Name</th>
        <th className="px-4 py-2 font-medium border">Component Type</th>
        <th className="px-4 py-2 font-medium border">Use Case</th>
        <th className="px-4 py-2 font-medium border">View Specs</th>
      </tr>
    </thead>
    <tbody>
      {data?.data?.map((item) => (
        <tr key={item._id} className="bg-white hover:bg-gray-50">
          <td className="text-sm px-4 py-2 border">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-16 h-16 object-cover rounded mx-auto"
            />
          </td>
          <td className="text-sm px-4 py-2 border">{item.name}</td>
          <td className="text-sm px-4 py-2 border">{item.componentType}</td>
          <td className="text-sm px-4 py-2 border">{item.useCase}</td>
          <td className="text-sm px-4 py-2 border">
            <button
              className="text-center hover:underline text-blue-600"
              onClick={() => handleViewClick(item)}
            >
              View
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {selectedComponent && (
        <div ref={viewRef}>
          <ComponentView data={selectedComponent} refetch={refetch}/>
        </div>
      )}
       {newComponent && (
          <NewComponentInputForm onClose={() => setNewComponent(false)} refetch={refetch}/>
        )}
    </section>
  );
};

export default ComponentTableView;
