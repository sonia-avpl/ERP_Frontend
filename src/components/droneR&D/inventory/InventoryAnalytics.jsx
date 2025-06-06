import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const InventoryAnalytics = () => {
  const data = {
    labels: ['Electronics', 'Motors', 'Batteries', 'Propellers', 'Cameras'],
    datasets: [
      {
        label: 'Stock Level',
        data: [120, 90, 40, 75, 60],
        backgroundColor: '#3b82f6', // Tailwind blue-500
      },
        {
      label: 'Minimum Required',
      data: [100, 80, 60, 60, 50],
      backgroundColor: '#f59e0b', // Tailwind amber-500
    },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="bg-white rounded shadow p-6 mt-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Inventory Analytics</h3>
        <button className="btn-secondary flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-gray-200 hover:bg-gray-300 rounded">
          <CalendarDaysIcon className="h-5 w-5 text-gray-600" />
          Last 30 Days
        </button>
      </div>
     <div className="w-full h-[300px]">
  <Bar data={data} options={options} />
</div>

    </div>
  );
};

export default InventoryAnalytics;
