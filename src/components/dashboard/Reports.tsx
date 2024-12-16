import { useEffect, useState } from "react";
import { ChartOptions } from "chart.js";
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
import * as api from "../../services/api";
import { format } from "date-fns"; // Asegúrate de tener instalada esta dependencia

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define el tipo para los datos mensuales
type MonthlySales = {
  month: string;
  total_sales: number;
};

export default function Reports() {
  const [summaryData, setSummaryData] = useState({
    totalSales: 0,
    totalFurniture: 0,
    totalRevenue: 0.0,
  });

  const [salesData, setSalesData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: "Monthly Sales",
        data: [],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  });

  // Opciones para el gráfico
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Reporte mensual de ventas",
      },
    },
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const totalSalesCount = await api.getTotalSalesCount();
        const totalFurnitureCount = await api.getTotalFurnitureCount();
        const totalRevenue = await api.getTotalRevenue();

        setSummaryData({
          totalSales: totalSalesCount,
          totalFurniture: totalFurnitureCount,
          totalRevenue: totalRevenue,
        });
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchSalesData() {
      try {
        const response: MonthlySales[] = await api.getMonthlySales();
        const labels = response.map((item) => format(new Date(item.month), "MMMM yyyy"));
        const data = response.map((item) => item.total_sales);

        setSalesData({
          labels,
          datasets: [
            {
              label: "Ventas Mensuales",
              data,
              backgroundColor: "rgba(64, 133, 245, 0.5)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    }

    fetchSalesData();
  }, []);

  // Formatear el totalRevenue en COP
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Resumen */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Overview</h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>Total Sales:</span>
              <span className="font-semibold">{summaryData.totalSales}</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Total Furniture:</span>
              <span className="font-semibold">{summaryData.totalFurniture}</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Total Revenue:</span>
              <span className="font-semibold">
                {formatter.format(summaryData.totalRevenue)}
              </span>
            </li>
          </ul>
        </div>

        {/* Gráfico */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Grafico de ventas</h3>
          <Bar options={options} data={salesData} />
        </div>
      </div>
    </div>
  );
}
