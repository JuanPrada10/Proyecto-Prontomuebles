import React, { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import type { Customer } from "../../types";

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const mockCustomers: Customer[] = [
    {
      id_cliente: 1,
      nombre: "Ana Martínez",
      telefono: "555-0101",
      correo: "ana.martinez@email.com",
      direccion: "Calle 123, Ciudad",
    },
    {
      id_cliente: 2,
      nombre: "Carlos López",
      telefono: "555-0102",
      correo: "carlos.lopez@email.com",
      direccion: "Avenida 456, Ciudad",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Cliente</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Añadir Cliente
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telefono
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Correo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Direccion
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockCustomers.map((customer) => (
              <tr key={customer.id_cliente}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {customer.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {customer.telefono}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {customer.correo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {customer.direccion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingCustomer(customer)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
