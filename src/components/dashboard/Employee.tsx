import React, { useEffect, useState} from "react";
import  {Plus, Edit2, Trash, X } from "lucide-react";
import type { Employee } from "../../types";
import * as api from "../../services/api";

export default function Employees() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        nombre: "",
        telefono: "",
    });
    
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const data = await api.getEmployees();
            setEmployees(data);
            setError(null);
        } catch (err) {
            setError("Failed to fetch employees");
            console.error("Error fetching employees:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        try {
            if (editingEmployee) {
                await api.updateEmployee(editingEmployee.id_vendedor, formData);
            } else {
                await api.createEmployee(formData);
            }
            setIsModalOpen(false);
            setEditingEmployee(null);
            setFormData({
                nombre: "",
                telefono: "",
            });
            fetchEmployees();
        } catch (err) {
            setError(
                editingEmployee
                ? "Failed to update employee"
                : "Failed to create employee"
            );
            console.error("Error submitting employee:", err);
        }
    };

    const handleEdit = (employee: Employee) => {
        setEditingEmployee(employee);
        setFormData({
            nombre: employee.nombre,
            telefono: employee.telefono,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this employee?"))
            return;
        try {
            await api.deleteEmployee(id);
            fetchEmployees();
        } catch (err) {
            setError("Failed to delete employee");
            console.error("Error deleting employee:", err);
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
                <h2 className="text-2xl font-bond text-gray-800">Empleados</h2>
                <button
                  onClick={() => {
                    setEditingEmployee(null);
                    setFormData({
                        nombre: "",
                        telefono: "",
                    });
                    setIsModalOpen(true);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                  >
                    <Plus className="h-5 w-5" />
                    Añadir Empleado
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
                                Teléfono
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {employees.map((employee) => (
                            <tr key={employee.id_vendedor}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {employee.nombre}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {employee.telefono}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex item-center gap-2">
                                    <button
                                     onClick={() => handleEdit(employee)}
                                     className="text-blue-600 hover:text-blue-800"
                                     >
                                        <Edit2 className="h-5 w-5" />
                                     </button>
                                     <button
                                       onClick={() => handleDelete(employee.id_vendedor)}
                                       className="text-red-600 hover:text-red-800"
                                       >
                                            <Trash className="h-5 w-5" />
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
                        <h3 className="tex-lg font-semibold">
                            {editingEmployee ? "Edit Employee" : "Add Employee"}
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
                            <label className="block text-sm text-gray-700 font-medium">
                                Phone
                            </label>
                            <input
                              type="tel"
                              name="telefono"
                              value={formData.telefono}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue"
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
                                     {editingEmployee? "Update" : "Create"}
                                </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
    );        
}