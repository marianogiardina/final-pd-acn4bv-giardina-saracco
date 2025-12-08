import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const onDashboard = location.pathname.startsWith("/dashboard");
  const target = onDashboard
    ? { to: "/", label: "Home" }
    : { to: "/dashboard", label: "Admin" };

  const isAuthenticated = AuthService.isAuthenticated();
  const currentUser = AuthService.getCurrentUser();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <header className="bg-[#f9d423] text-black">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">GLYPHA</h1>
            <p className="text-sm mt-1">
              {isAuthenticated && currentUser 
                ? `¡Hola, ${currentUser.name}!` 
                : "¡Vamos a encontrar tu tipografía ideal!"}
            </p>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              to={target.to}
              className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              {target.label}
            </Link>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Cerrar Sesión
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-white text-black border-2 border-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
