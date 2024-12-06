import React, { useState, useEffect } from "react";
import { Plus, Eye, X } from "lucide-react";
import type { Sale, Customer, Seller, Furniture } from "../../types";
import * as api from "../../services/api";
import { format } from "date-fns";

interface SaleFormData {
  id_cliente: number;
  id_vendedor: number;
  detalles: {
    id_mueble: number;
    cantidad: number;
  }[];
}

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [furniture, setFurniture] = useState<Furniture[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingSale, setViewingSale] = useState<Sale | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<SaleFormData>({
    id_cliente: 0,
    id_vendedor: 0,
    detalles: [{ id_mueble: 0, cantidad: 1 }],
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [salesData, customersData, sellersData, furnitureData] =
        await Promise.all([
          api.getSales(),
          api.getCustomers(),
          api.getSellers(),
          api.getFurniture(),
        ]);
      setSales(salesData);
      setCustomers(customersData);
      setSellers(sellersData);
      setFurniture(furnitureData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createSale(formData);
      setIsModalOpen(false);
      setFormData({
        id_cliente: 0,
        id_vendedor: 0,
        detalles: [{ id_mueble: 0, cantidad: 1 }],
      });
      fetchInitialData();
    } catch (err) {
      setError("Failed to create sale");
      console.error("Error creating sale:", err);
    }
  };

  const addSaleDetail = () => {
    setFormData((prev) => ({
      ...prev,
      detalles: [...prev.detalles, { id_mueble: 0, cantidad: 1 }],
    }));
  };

  const removeSaleDetail = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      detalles: prev.detalles.filter((_, i) => i !== index),
    }));
  };

  const updateSaleDetail = (index: number, field: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      detalles: prev.detalles.map((detail, i) =>
        i === index ? { ...detail, [field]: value } : detail
      ),
    }));
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
        <h2 className="text-2xl font-bold text-gray-800">Sales</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          New Sale
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
                Sale ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seller
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sales.map((sale) => {
              const customer = customers.find(
                (c) => c.id_cliente === sale.id_cliente
              );
              const seller = sellers.find(
                (s) => s.id_vendedor === sale.id_vendedor
              );

              return (
                <tr key={sale.id_venta}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {sale.id_venta}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format(new Date(sale.fecha), "MMM dd, yyyy")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer?.nombre || "Unknown"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {seller?.nombre || "Unknown"}
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
              );
            })}
          </tbody>
        </table>
      </div>

      {/* New Sale Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">New Sale</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Customer
                  </label>
                  <select
                    value={formData.id_cliente}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        id_cliente: Number(e.target.value),
                      }))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Customer</option>
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
                    Seller
                  </label>
                  <select
                    value={formData.id_vendedor}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        id_vendedor: Number(e.target.value),
                      }))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Seller</option>
                    {sellers.map((seller) => (
                      <option
                        key={seller.id_vendedor}
                        value={seller.id_vendedor}
                      >
                        {seller.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-md font-medium">Products</h4>
                  <button
                    type="button"
                    onClick={addSaleDetail}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Add Product
                  </button>
                </div>

                {formData.detalles.map((detail, index) => (
                  <div key={index} className="flex gap-4 items-end">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Product
                      </label>
                      <select
                        value={detail.id_mueble}
                        onChange={(e) =>
                          updateSaleDetail(
                            index,
                            "id_mueble",
                            Number(e.target.value)
                          )
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Product</option>
                        {furniture.map((item) => (
                          <option key={item.id_mueble} value={item.id_mueble}>
                            {item.tipo_mueble} - {item.material} - $
                            {item.precio}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-32">
                      <label className="block text-sm font-medium text-gray-700">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={detail.cantidad}
                        onChange={(e) =>
                          updateSaleDetail(
                            index,
                            "cantidad",
                            Number(e.target.value)
                          )
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>

                    {formData.detalles.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSaleDetail(index)}
                        className="text-red-600 hover:text-red-700 mb-2"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
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
                  Create Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Sale Details Modal */}
      {viewingSale && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Sale Details</h3>
              <button
                onClick={() => setViewingSale(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Customer</p>
                  <p className="text-gray-900">
                    {customers.find(
                      (c) => c.id_cliente === viewingSale.id_cliente
                    )?.nombre || "Unknown"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Seller</p>
                  <p className="text-gray-900">
                    {sellers.find(
                      (s) => s.id_vendedor === viewingSale.id_vendedor
                    )?.nombre || "Unknown"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="text-gray-900">
                    {format(new Date(viewingSale.fecha), "MMMM dd, yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total</p>
                  <p className="text-gray-900">
                    ${viewingSale.total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Products</h4>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Product
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Quantity
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {viewingSale.detalles.map((detail) => {
                      const product = furniture.find(
                        (f) => f.id_mueble === detail.id_mueble
                      );
                      return (
                        <tr key={detail.id_detalle}>
                          <td className="px-4 py-2">
                            {product
                              ? `${product.tipo_mueble} - ${product.material}`
                              : "Unknown Product"}
                          </td>
                          <td className="px-4 py-2">{detail.cantidad}</td>
                          <td className="px-4 py-2">
                            ${detail.subtotal.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
