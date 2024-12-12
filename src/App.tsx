import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import { useState } from "react";
import { useAuthStore } from "./store/authStore";

export default function App() {
  const token = useAuthStore((state) => state.token);

  const [isLogin, setIsLogin] = useState(true);

  if (token) {
    return <Dashboard />;
  } else {
    <LoginForm onSwitchToRegister={() => setIsLogin(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? "Bienvenido" : "Crear Cuenta"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin
              ? "Por favor ingrese a su cuenta"
              : "Por favor llene la informacion"}
          </p>
        </div>
        {isLogin ? (
          <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}
