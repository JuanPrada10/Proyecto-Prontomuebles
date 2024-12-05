import React, { useState } from "react";
import { Plus, Eye } from "lucide-react";
import type { Sale } from "../../types";
import { format } from "date-fns";

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingSale, setViewingSale] = useState<Sale | null>(null);

  const mockSales: Sale[] = [
    {
      id_venta: 1,
      fecha: "2024-03-10",
      total: 1599.98,
      id_cliente: 1,
      id_vendedor: 1,
      detalles: [
        {
          id_detalle: 1,
          id_venta: 1,
          id_mueble: 1,
          cantidad: 1,
          subtotal: 999.99,
        },
        {
          id_detalle: 2,
          id_venta: 1,
          id_mueble: 2,
          cantidad: 1,
          subtotal: 599.99,
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Ventas</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Nueva Venta
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Vendedor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Vendedor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockSales.map((sale) => (
              <tr key={sale.id_venta}>
                <td className="px-6 py-4 whitespace-nowrap">{sale.id_venta}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(sale.fecha), "MMM dd, yyyy")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {sale.id_cliente}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {sale.id_vendedor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${sale.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => setViewingSale(sale)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
