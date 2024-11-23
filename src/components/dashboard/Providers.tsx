import React, { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import type { Provider } from "../../types";

export default function Providers() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null);

  const mockProviders: Provider[] = [
    {
      id_proveedor: 1,
      nombre: "Muebles Modernos S.A.",
      direccion: "Calle Principal 123",
      telefono: "555-0123",
      persona_contacto: "Juan Pérez",
    },
    {
      id_proveedor: 2,
      nombre: "Diseños Exclusivos",
      direccion: "Av. Central 456",
      telefono: "555-0124",
      persona_contacto: "María García",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Proveedor</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Añadir
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
                Direccion
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telefono
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Persona De Contacto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Accion
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockProviders.map((provider) => (
              <tr key={provider.id_proveedor}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {provider.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {provider.direccion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {provider.telefono}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {provider.persona_contacto}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingProvider(provider)}
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
