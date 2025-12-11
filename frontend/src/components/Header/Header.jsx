import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const onDashboard = location.pathname.startsWith("/dashboard");
  const onHome = location.pathname.startsWith("/home");

  const isAuthenticated = AuthService.isAuthenticated();
  const currentUser = AuthService.getCurrentUser();
  const isAdmin = AuthService.isAdmin();
  
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/";

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
          {!isAuthPage && (
            <nav className="flex items-center gap-4">
              {isAuthenticated && !onHome && (
                <Link
                  to="/home"
                  className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Home
                </Link>
              )}

              {isAuthenticated && isAdmin && !onDashboard && (
                <Link
                  to="/dashboard"
                  className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Admin
                </Link>
              )}

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
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
