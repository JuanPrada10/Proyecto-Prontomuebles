import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import type { Furniture, Provider } from "../../types";
import * as api from "../../services/api";
export default function Furniture() {
  const [furniture, setFurniture] = useState<Furniture[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFurniture, setEditingFurniture] = useState<Furniture | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    tipo_mueble: "",
    material: "",
    alto: 0,
    ancho: 0,
    profundidad: 0,
    color: "",
    precio: 0,
  });

  useEffect(() => {
    fetchFurniture();
  }, []);

  const fetchFurniture = async () => {
    try {
      const [furnitureData, providersData] = await Promise.all([
        api.getFurniture(),
        api.getProviders(), // Asegúrate de tener una función API para obtener proveedores
      ]);
      setFurniture(furnitureData);
      setProviders(providersData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch furniture or providers");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };
  const getProviderName = (id_proveedor: number) => {
    const provider = providers.find((p) => p.id_proveedor === id_proveedor);
    return provider ? provider.nombre : "Proveedor desconocido";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingFurniture) {
        const negativo = formData.precio;
        if (negativo < 0) {
          return setError("Numero Negativo");
        }

        await api.updateFurniture(editingFurniture.id_mueble, formData);
      } else {
        await api.createFurniture(formData);
      }

      setIsModalOpen(false);
      setEditingFurniture(null);
      setFormData({
        tipo_mueble: "",
        material: "",
        alto: 0,
        ancho: 0,
        profundidad: 0,
        color: "",
        precio: 0,
      });
      fetchFurniture();
    } catch (err) {
      setError(
        editingFurniture
          ? "Failed to update furniture"
          : "Failed to create furniture"
      );
      console.error("Error saving furniture:", err);
    }
  };

  const handleEdit = (furniture: Furniture) => {
    setEditingFurniture(furniture);
    setFormData({
      tipo_mueble: furniture.tipo_mueble,
      material: furniture.material,
      alto: furniture.alto,
      ancho: furniture.ancho,
      profundidad: furniture.profundidad,
      color: furniture.color,
      precio: furniture.precio,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this furniture?"))
      return;

    try {
      await api.deleteFurniture(id);
      fetchFurniture();
    } catch (err) {
      setError("Failed to delete furniture");
      console.error("Error deleting furniture:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Muebles</h2>
        <button
          onClick={() => {
            setEditingFurniture(null);
            setFormData({
              tipo_mueble: "",
              material: "",
              alto: 0,
              ancho: 0,
              profundidad: 0,
              color: "",
              precio: 0,
            });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Añadir mueble
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">{error}</div>
      )}

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
                Dimensiones
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Color
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {furniture.map((furniture) => (
              <tr key={furniture.id_mueble}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {furniture.tipo_mueble}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {furniture.material}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {furniture.alto} x {furniture.ancho} x {furniture.profundidad}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {furniture.color}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {furniture.precio}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {" "}
                  {getProviderName(furniture.id_proveedor)}{" "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(furniture)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(furniture.id_mueble)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingFurniture ? "Edit Furniture" : "Add Furniture"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tipo de mueble
                </label>
                <input
                  type="text"
                  name="tipo_mueble"
                  placeholder="Tipo de mueble"
                  value={formData.tipo_mueble}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Material
                </label>
                <input
                  type="text"
                  name="material"
                  placeholder="Material"
                  value={formData.material}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dimensiones
                </label>
                <input
                  type="number"
                  name="alto"
                  value={formData.alto ? formData.alto : ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Alto"
                  required
                  min={0}
                />
              </div>
              <div>
                <input
                  type="number"
                  name="ancho"
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Ancho"
                  value={formData.ancho ? formData.ancho : ""}
                  required
                  min={0}
                />
              </div>

              <div>
                <input
                  type="number"
                  name="profundidad"
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Profundidad"
                  value={formData.profundidad ? formData.profundidad : ""}
                  required
                  min={0}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  placeholder="Color"
                  onChange={handleChange}
                  value={formData.color}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Precio
                </label>
                <input
                  type="number"
                  name="precio"
                  placeholder="Precio"
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.precio ? formData.precio : ""}
                  required
                  min={0}
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  {editingFurniture ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
