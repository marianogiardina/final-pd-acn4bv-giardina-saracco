import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/FormInput";

const Register = () => {
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

          <form className="space-y-5">
            <div>
              <Input
                type={"text"}
                onChange={() => {}}
                value={""}
                key={"fullName"}
                placeholder={"Escribe tu nombre completo"}
                label={"Nombre Completo"}
              />
            </div>

            <div>
              <Input
                type={"email"}
                onChange={() => {}}
                value={""}
                key={"email"}
                placeholder={"Escribe tu email"}
                label={"Correo Electrónico"}
              />
            </div>

            <div>
              <Input
                type={"password"}
                onChange={() => {}}
                value={""}
                key={"password"}
                placeholder={"Escribe tu contraseña"}
                label={"Contraseña"}
              />
              <p className="text-xs text-gray-500 mt-1">Mínimo 4 caracteres</p>
            </div>

            <div className="w-full">
              <Button
                onClick={() => {}}
                text={"Registrarse"}
                variant={"secondary"}
                key={"register-button"}
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
