import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import type { Customer } from "../../types";
import * as api from "../../services/api";

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    direccion: "",
  });


  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await api.getCustomers();
      setCustomers(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch customers");
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault();
    try {
      if (editingCustomer) {
        await api.updateCustomer(editingCustomer.id_cliente, formData);
      } else {
        await api.createCustomer(formData);
      }
      setIsModalOpen(false);
      setEditingCustomer(null);
      setFormData({
        nombre: "",
        telefono: "",
        correo: "",
        direccion: "",
      });
      fetchCustomers();
    } catch (err) {
      setError(
        editingCustomer
        ? "Failed to update customer"
        : "Failed to create customer"
      );
      console.error("Error submitting form:", err);
    }
  };

  const handleEdit = (customers: Customer) => {
    setEditingCustomer(customers);
    setFormData({
      nombre: customers.nombre,
      telefono: customers.telefono,
      correo: customers.correo,
      direccion: customers.direccion,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;
    try{
      await api.deleteCustomer(id);
      fetchCustomers();
    }catch (err){
      setError("Failed to delete customer");
      console.error("Error deleting customer:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({...prev, [name]: value }));
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
        <h2 className="text-2xl font-bold text-gray-800">Clientes</h2>
        <button
          onClick={() => {
            setEditingCustomer(null);
            setFormData({
              nombre: "",
              telefono: "",
              correo: "",
              direccion: "",
            });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Añadir Cliente
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
            {customers.map((customer) => (
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
                  <div className="flex item-center gap-2">
                    <button
                    onClick={() => handleEdit(customer)}
                    className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={()=> handleDelete(customer.id_cliente)}
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
                {editingCustomer ? "Edit Customers" : "Add Customers"}
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
                <label className="block text-sm text-gray-700 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
          
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
        
            <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
              />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
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
                  {editingCustomer ? "Update" : "Create"}
                </button>
            </div>
          </form>
        </div>
      </div>
      )}
    </div>
  );
}