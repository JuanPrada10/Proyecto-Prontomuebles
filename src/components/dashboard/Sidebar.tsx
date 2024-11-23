import {
  Package,
  Sofa,
  Users,
  ShoppingCart,
  BarChart2,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  onLogout: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  onLogout,
}: SidebarProps) {
  const menuItems = [
    { id: "providers", icon: Package, label: "Proveedor" },
    { id: "furniture", icon: Sofa, label: "Mueble" },
    { id: "customers", icon: Users, label: "Cliente" },
    { id: "sales", icon: ShoppingCart, label: "Ventas" },
    { id: "reports", icon: BarChart2, label: "Reporte" },
  ];

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">ProntoMueble</h1>
      </div>
      <nav className="mt-8">
        <div className="px-2 space-y-1">
          {menuItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`${
                activeTab === id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
            >
              <Icon className="mr-3 h-6 w-6" />
              {label}
            </button>
          ))}
        </div>
      </nav>
      <div className="absolute bottom-0 w-64 p-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-2 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
        >
          <LogOut className="mr-3 h-6 w-6" />
          Cerrar Sesion
        </button>
      </div>
    </div>
  );
}
