import { useRef } from "react";

const ComponentTableView = () => {
  const bottomRef = useRef(null);

  const handleScroll = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-white rounded shadow my-10">
      <div className="text-xl font-semibold mb-4 text-gray-700">
        <h3 className="text-2xl font-semibold text-gray-800">
          Component Detailed View
        </h3>
        <table className="min-w-full table-auto border border-gray-300 rounded-lg shadow-sm text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 font-medium border">Name</th>
              <th className="px-4 py-2 font-medium border">Component Type</th>
              <th className="px-4 py-2 font-medium border">Use Case</th>
              <th className="px-4 py-2 font-medium border">View Specs</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-100">
              <td className="text-sm px-4 py-2 border">Ublox Neo M8N</td>
              <td className="text-sm px-4 py-2 border">GPS Module</td>
              <td className="text-sm px-4 py-2 border">
                Navigation and return-to-home for autonomous drones
              </td>
              <td className="text-sm px-4 py-2 border">
                <button
                  onClick={handleScroll}
                  className="text-center hover:underline hover:text-blue-600"
                >
                  view
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div ref={bottomRef} />
      </div>
    </section>
  );
};

export default ComponentTableView;
