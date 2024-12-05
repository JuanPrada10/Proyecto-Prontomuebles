import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Reports() {
  const salesData = {
    labels: ["January", "February", "March"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [12000, 15000, 18000],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Sales Report",
      },
    },
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Reports</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          <Bar options={options} data={salesData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Leather Sofa</span>
              <span className="font-semibold">15 units</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Dining Table</span>
              <span className="font-semibold">12 units</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Office Chair</span>
              <span className="font-semibold">10 units</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
