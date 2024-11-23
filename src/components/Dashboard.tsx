import { useAuthStore } from "../store/authStore";
import Sidebar from "./dashboard/Sidebar";
import Providers from "./dashboard/Providers";
import Furniture from "./dashboard/Furniture";
import Customers from "./dashboard/Customers";
import Sales from "./dashboard/Sales";
import Reports from "./dashboard/Reports";
import { useState } from "react";

type TabType = "providers" | "furniture" | "customers" | "sales" | "reports";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("providers");
  const logout = useAuthStore((state) => state.logout);

  const renderContent = () => {
    switch (activeTab) {
      case "providers":
        return <Providers />;
      case "furniture":
        return <Furniture />;
      case "customers":
        return <Customers />;
      case "sales":
        return <Sales />;
      case "reports":
        return <Reports />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={logout}
      />
      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
  );
}
