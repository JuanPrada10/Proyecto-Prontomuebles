import { Plus, Eye, X } from "lucide-react";
import { useState, useEffect } from "react";
import type { Customer, Sale } from "../../types";
import { format } from "date-fns";
import * as api from "../../services/api";

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);
  const [selectedOption, setSelectedOption] = useState("0");
  const [formData, setFormData] = useState({
    id_vendedor: 0,
    id_cliente: 0,
    total: 0,
  });
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });
  useEffect(() => {
    fetchSale();
  }, []);
  const fetchSale = async () => {
    try {
      const [salesData, customersData] = await Promise.all([
        api.getSales(),
        api.getCustomers(),
      ]);
      setSales(salesData);
      setCustomers(customersData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch customer or sales data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };
  const getCustomerName = (id_cliente: number) => {
    const customer = customers.find((c) => c.id_cliente === id_cliente);
    return customer ? customer.nombre : "Proveedor desconocido";
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSelectedOption(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSale) {
        const negativo = formData.total;
        if (negativo < 0) {
          return setError("Numero Negativo");
        }

        return setError("Venta Existente");
      } else {
        await api.createSale(formData);
      }

      setIsModalOpen(false);
      setEditingSale(null);
      setFormData({
        id_vendedor: 0,
        id_cliente: 0,
        total: 0,
      });
      fetchSale();
    } catch (err) {
      setError(editingSale && "Failed to create Sale");
      console.error("Error saving Sale:", err);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Ventas</h2>
        <button
          onClick={() => {
            setEditingSale(null);
            setFormData({
              id_vendedor: 0,
              id_cliente: 0,
              total: 0,
            });
            setIsModalOpen(true);
          }}
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
                Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendedor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
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
            {sales.map((sale) => (
              <tr key={sale.id_venta}>
                <td className="px-6 py-4 whitespace-nowrap">{sale.id_venta}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {sale.id_vendedor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(sale.fecha), "MMM dd, yyyy")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getCustomerName(sale.id_cliente)}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {formatter.format(sale.total)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye className="h-5 w-5" />
                  </button>
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
                {editingSale && "Anadir Venta"}
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
                  Cliente
                </label>
                <select
                  name="id_Cliente"
                  id="cliente"
                  value={selectedOption}
                  onChange={handleChangeSelect}
                  className="block w-full pl-5  py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                >
                  <option value="0" disabled className="text-gray-300">
                    Seleccione una opción
                  </option>
                  {customers.map((customer) => (
                    <option
                      key={customer.id_cliente}
                      value={customer.id_cliente}
                    >
                      {customer.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Vendedor
                </label>
                <select
                  name="id_vendedor"
                  id="vendedor"
                  value={selectedOption}
                  onChange={handleChangeSelect}
                  className="block w-full pl-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                >
                  <option value="0" disabled className="text-gray-300">
                    Seleccione una opción
                  </option>
                  <option value="1">Administrador</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total
                </label>
                <input
                  type="number"
                  name="total"
                  value={formData.total}
                  onChange={handleChange}
                  className="block w-full pl-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                  placeholder="Total"
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
                  {"Generar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
