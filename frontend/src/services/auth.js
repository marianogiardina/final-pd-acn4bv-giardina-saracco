// URL base del backend
const API_BASE_URL = "http://localhost:3000/api";

const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    // Guardar token y usuario en localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  } catch (error) {
    console.error("Error en registro:", error);
    throw error;
  }
};


const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    // Guardar token y usuario en localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};


const getMe = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    throw error;
  }
};


const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};


const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};


const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};


const getToken = () => {
  return localStorage.getItem("token");
};

const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.role === 2;
};

export const AuthService = {
  register,
  login,
  getMe,
  logout,
  isAuthenticated,
  getCurrentUser,
  getToken,
  isAdmin,
};
