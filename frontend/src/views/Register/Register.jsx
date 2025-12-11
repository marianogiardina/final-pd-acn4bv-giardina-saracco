import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/FormInput";
import { AuthService } from "../../services/auth";
import { useToast } from "../../context/ToastContext";

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validaciones básicas
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError("Todos los campos son requeridos");
      setLoading(false);
      return;
    }

    if (formData.password.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres");
      setLoading(false);
      return;
    }

    try {
      // Llamar al servicio de registro
      const response = await AuthService.register(formData);
      
      showToast("¡Usuario registrado exitosamente!", "success");
      
      navigate("/home");
    } catch (err) {
      setError(err.message || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#030712] text-white font-sans min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md m-10">
        <div className="bg-[#1a1d2e] rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#f9d423] mb-2">
              Crear Cuenta
            </h1>
            <p className="text-gray-400 text-sm">
              Completa el formulario para registrarte
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Input
                type={"text"}
                onChange={(value) => handleChange("name", value)}
                value={formData.name}
                placeholder={"Escribe tu nombre completo"}
                label={"Nombre Completo"}
              />
            </div>

            <div>
              <Input
                type={"email"}
                onChange={(value) => handleChange("email", value)}
                value={formData.email}
                placeholder={"Escribe tu email"}
                label={"Correo Electrónico"}
              />
            </div>

            <div>
              <Input
                type={"password"}
                onChange={(value) => handleChange("password", value)}
                value={formData.password}
                placeholder={"Escribe tu contraseña"}
                label={"Contraseña"}
              />
              <p className="text-xs text-gray-500 mt-1">Mínimo 4 caracteres</p>
            </div>

            <div className="w-full">
              <Button
                text={loading ? "Registrando..." : "Registrarse"}
                variant={"secondary"}
                type="submit"
                width={"w-full"}
              />
            </div>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to={"/login"}
                className="text-[#f9d423] hover:text-[#ffd700] font-medium transition-colors"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
