import React, { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import type { Furniture } from "../../types";

export default function Furniture() {
  const [furniture, setFurniture] = useState<Furniture[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFurniture, setEditingFurniture] = useState<Furniture | null>(
    null
  );

  const mockFurniture: Furniture[] = [
    {
      id_mueble: 1,
      tipo_mueble: "Sofa",
      material: "Leather",
      dimensiones: {
        alto: 90,
        ancho: 200,
        profundidad: 100,
      },
      color: "Brown",
      precio: 999.99,
      id_proveedor: 1,
    },
    {
      id_mueble: 2,
      tipo_mueble: "Dining Table",
      material: "Oak Wood",
      dimensiones: {
        alto: 75,
        ancho: 160,
        profundidad: 90,
      },
      color: "Natural",
      precio: 599.99,
      id_proveedor: 2,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Muebles</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Añadir mueble
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Material
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dimension
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Color
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Accion
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockFurniture.map((item) => (
              <tr key={item.id_mueble}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.tipo_mueble}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.material}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {`${item.dimensiones.alto}x${item.dimensiones.ancho}x${item.dimensiones.profundidad} cm`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.color}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${item.precio.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingFurniture(item)}
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
