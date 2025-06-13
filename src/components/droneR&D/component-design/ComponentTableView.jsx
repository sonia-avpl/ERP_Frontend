import { useEffect, useState } from "react";

const ComponentTableView = () => {

    // const [tabledata, setTableData] = useState([]);

    useEffect(() => {}, [])


  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-white rounded shadow my-10">
      <div className="text-xl font-semibold mb-4 text-gray-700">
        <h3 className="text-2xl font-semibold text-gray-800">
          Component Detailed View
        </h3>
        <table className="min-w-full table-auto border border-gray-300 rounded-lg shadow-sm">
          <tbody>
            <tr className="bg-gray-100">
              <td className="px-4 py-2 font-medium border">Name</td>
              <td className="text-sm px-4 py-2 border">Foxeer F722 V2</td>
            </tr>

            <tr>
              <td className="px-4 py-2 font-medium border">Component Type</td>
              <td className="text-sm px-4 py-2 border">Flight Controller</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium border">Use Case</td>
              <td className="text-sm px-4 py-2 border">Advanced acrobatic flight, stable control for FPV racing drones</td>
            </tr>

            <tr>
              <td className="px-4 py-2 font-medium border">Specs</td>
              <td className="px-4 py-2 border">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-2 py-1">Weight</th>
                      <th className="px-2 py-1">Voltage</th>
                      <th className="px-2 py-1">Capacity</th>
                      <th className="px-2 py-1">Range</th>
                      <th className="px-2 py-1">Speed</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    <tr className="text-center">
                      <td className="px-2 py-1">6g</td>
                      <td className="px-2 py-1">4.0-5.0V</td>
                      <td className="px-2 py-1">5000</td>
                      <td className="px-2 py-1">800km</td>
                      <td className="px-2 py-1">1200</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ComponentTableView;
