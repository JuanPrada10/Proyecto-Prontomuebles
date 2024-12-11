import { NavLink } from "react-router-dom";
import {
  Package,
  Sofa,
  Users,
  ShoppingCart,
  BarChart2,
  LogOut,
  Briefcase,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const role = useAuthStore((state) => state?.user?.role || "seller");
  const commonMenuItems = [
    { id: "customers", icon: Users, label: "Clientes" },
    { id: "sales", icon: ShoppingCart, label: "Ventas" },
    { id: "reports", icon: BarChart2, label: "Reportes" },
    {id: "employee", icon: Briefcase, label: "Empleados"},
  ];
  const adminMenuItems = [
    { id: "providers", icon: Package, label: "Proveedores" },
    { id: "furniture", icon: Sofa, label: "Muebles" },    
    ...commonMenuItems,
  ];
  const menuItemsByRole = {
    admin: adminMenuItems,
    seller: commonMenuItems,
  };

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">ProntoMuebles</h1>
      </div>
      <nav className="mt-8">
        <div className="px-2 space-y-1">
          {menuItemsByRole?.[role].map(({ id, icon: Icon, label }) => (
            <NavLink
              key={id}
              to={`/${id}`}
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-50 text-blue-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
                  : "text-gray-600 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
              }
            >
              <Icon className="mr-3 h-6 w-6" />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
      <div className="absolute bottom-0 w-64 p-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-2 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
        >
          <LogOut className="mr-3 h-6 w-6" />
          Salir
        </button>
      </div>
    </div>
  );
}
