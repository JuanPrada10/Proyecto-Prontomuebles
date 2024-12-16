import { NavLink } from "react-router-dom";
import {
  Package,
  Sofa,
  Users,
  ShoppingCart,
  BarChart2,
  LogOut,
  Briefcase,
  User,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";

interface SidebarProps {
  onLogout: () => void;
}
interface MenuItem {
  id: string;
  icon: React.ElementType;
  label: string;
}
interface MenuItemsByRole {
  admin: MenuItem[];
  seller: MenuItem[];
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const role = useAuthStore((state) => state?.user?.role || "seller");
  const commonMenuItems: MenuItem[] = [
    { id: "customers", icon: Users, label: "Clientes" },
    { id: "sales", icon: ShoppingCart, label: "Ventas" },
    { id: "employee", icon: Briefcase, label: "Empleados" },
  ];
  const adminMenuItems: MenuItem[] = [
    { id: "providers", icon: Package, label: "Proveedores" },
    { id: "furniture", icon: Sofa, label: "Muebles" },
    { id: "user", icon: User, label: "Usuarios" },
    { id: "reports", icon: BarChart2, label: "Reportes" },
    ...commonMenuItems,
  ];
  const menuItemsByRole: MenuItemsByRole = {
    admin: adminMenuItems,
    seller: commonMenuItems,
  };

  return (
    <div className="w-64 shadow-lg min-h-screen bg-blue-900">
      <div className="p-4">
        <h1 className="text-xl font-bold text-white">ProntoMuebles</h1>
      </div>
      <nav className="mt-8">
        <div className="px-2 space-y-1 ">
          {menuItemsByRole[role as keyof MenuItemsByRole].map(
            ({ id, icon: Icon, label }) => (
              <NavLink
                key={id}
                to={`/${id}`}
                className={({ isActive }) =>
                  isActive
                    ? "bg-white text-blue-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
                    : "text-white hover:bg-white hover:text-blue-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
                }
              >
                <Icon className="mr-3 h-6 w-6" />
                {label}
              </NavLink>
            )
          )}
        </div>
      </nav>
      <div className="absolute bottom-0 w-64 p-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-2 py-2 text-sm font-medium text-white hover:bg-red-100 hover:text-red-700 rounded-md"
        >
          <LogOut className="mr-3 h-6 w-6" />
          Salir
        </button>
      </div>
    </div>
  );
}
