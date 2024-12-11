import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Sidebar from "./dashboard/Sidebar";
import Providers from "./dashboard/Providers";
import Furniture from "./dashboard/Furniture";
import Customers from "./dashboard/Customers";
import Sales from "./dashboard/Sales";
import Reports from "./dashboard/Reports";
import Employees from "./dashboard/Employee";
import User from "./dashboard/User";

export default function Dashboard() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex">
        <Sidebar onLogout={logout} />
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/providers" element={<Providers />} />
            <Route path="/furniture" element={<Furniture />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/employee" element={<Employees />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
