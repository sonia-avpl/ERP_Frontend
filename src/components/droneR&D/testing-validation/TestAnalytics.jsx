import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const statusData = {
  labels: ['Passed', 'Failed', 'Pending'],
  datasets: [
    {
      label: 'Test Status',
      data: [12, 3, 5],
      backgroundColor: ['#22c55e', '#ef4444', '#facc15'],
      borderWidth: 1,
    },
  ],
};

const trendData = {
  labels: ['Jun 1', 'Jun 5', 'Jun 10', 'Jun 15', 'Jun 20'],
  datasets: [
    {
      label: 'Test Completed Over Time',
      data: [2, 5, 8, 14, 20],
      fill: false,
      borderColor: '#3b82f6',
      tension: 0.4,
    },
  ],
};

const TestAnalytics = () => {
  return (
    <div className="test-analytics p-4 bg-white rounded shadow">
      <div className="section-header flex items-center justify-between mb-4">
        <h3 className="section-title text-lg font-semibold text-gray-800">Test Analytics</h3>
        <button className="btn btn-secondary bg-gray-200 text-gray-800 px-3 py-1.5 rounded flex items-center gap-2 hover:bg-gray-300">
          <ArrowPathIcon className="w-5 h-5" />
          Refresh
        </button>
      </div>

      <div className="charts-container grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-64 h-64">
  <Doughnut data={statusData} options={{ maintainAspectRatio: false }} />
</div>

        <div className="chart-card p-4 bg-gray-50 rounded shadow">
          <Line data={trendData} />
        </div>
      </div>
    </div>
  );
};

export default TestAnalytics;
