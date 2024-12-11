import React, { useEffect, useState} from "react";
import { UserX, Edit2, UserMinus, X } from "lucide-react";
import type { User } from "../../types";
import * as api from "../../services/api";

export default function User() {
    const [users, setUsers] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        username: "",
        role: "",
    });

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const data = await api.getUser();
            setUsers(data);
            setError(null);
        } catch (err) {
            setError("Failed to fetch user");
            console.error("Error fetching user:", err);
        }finally{
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        try {
            if (editingUser) {
                await api.updateUser(editingUser.id_usuario, formData);
            } else {
                await api.createUser(formData);
            }
            setIsModalOpen(false);
            setEditingUser(null);
            setFormData({ 
                username: "", 
                role: "", 
            });
            fetchUser();
        } catch (err) {
            setError(
                editingUser
                ? "Failed to or update user"
                : "Failed to create user"
            );
            console.error("Error creating or updating user:", err);
        }
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setFormData({
            username: user.username,
            role: user.role,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this User?"))
            return;
        try {
            await api.deleteUser(id);
            fetchUser();
        } catch (err) {
            setError("Failed to delete user");
            console.error("Error deleting user:", err);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
                <h2 className="text-2xl font-bold text-gray-800">Usuarios</h2>
                <button
                    onClick={() => {
                        setEditingUser(null);
                        setFormData({
                            username: "",
                            role: "",
                        });
                        setIsModalOpen(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                    >
                        <UserX className="h-5 w-5"  />
                        Añadir Usuario
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
                            Nombre de Usuario
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rol
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                        <tr key={user.id_usuario}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {user.username}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {user.role}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex item-center gap-2">
                                    <button
                                     onClick={() => handleEdit(user)}
                                     className="text-blue-600 hover:text-blue-800">
                                        <Edit2 className="h-5 w-5" />
                                     </button>
                                     <button
                                     onClick={() => handleDelete(user.id_usuario)}
                                     className="text-red-600 hover:text-red-800">
                                        <UserMinus  className="h-5 w-5" />
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
                            {editingUser? "Edit User" : "Add User"}
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
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Role
                            </label>
                            <select
                                name="role"
                                id = "role"
                                value={formData.role}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            >
                                <option value="">Selecciona el rol</option>
                                <option value="admin">Administrador</option>
                                <option value="seller">Vendedor</option>
                            </select>

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
                                {editingUser? "Update" : "Create"}
                            </button>
                        </div>
                    </form>
                </div>      
            </div>
        )}
    </div>        
    );
}
