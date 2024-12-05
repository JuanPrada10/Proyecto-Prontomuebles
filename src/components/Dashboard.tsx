import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Sidebar from "./dashboard/Sidebar";
import Providers from "./dashboard/Providers";
import Furniture from "./dashboard/Furniture";
import Customers from "./dashboard/Customers";
import Sales from "./dashboard/Sales";
import Reports from "./dashboard/Reports";

export default function Dashboard() {
  const logout = useAuthStore((state) => state.logout);
  const role = useAuthStore((state) => state?.user?.role || "seller");

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex">
        <Sidebar onLogout={logout} />
        <main className="flex-1 p-8">
          <Routes>
            <Route
              path="/providers"
              element={
                role === "admin" ? (
                  <Providers />
                ) : (
                  <h1>No tienes permisos perra</h1>
                )
              }
            />
            <Route path="/furniture" element={<Furniture />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<h1>RUTA NO ENCONTRADA</h1>} />{" "}
          </Routes>
        </main>
      </div>
    </Router>
  );
}
