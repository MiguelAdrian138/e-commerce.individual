"use client";
import React, { useState, useContext } from "react";
import { UserContext } from "../components/context/userContext";
import Image from "next/image";
import { validateEmail, validatePassword } from "../utils/validations";

interface FormData {
  email: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const { login } = useContext(UserContext);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setLoginError(null);
     setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
     let hasErrors = false;

     if (!validateEmail(formData.email)) {
       setErrors(prev => ({ ...prev, email: "Correo electrónico inválido" }));
       hasErrors = true;
     }
     if (!validatePassword(formData.password)) {
       setErrors(prev => ({ ...prev, password: "Contraseña inválida" }));
       hasErrors = true;
     }

     if (hasErrors) {
       return; 
     }
    console.log("Intentando iniciar sesión con:", formData);

    try {
      await login(formData.email, formData.password);
      console.log("Inicio de sesión exitoso");
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      setLoginError((error as { message: string }).message);
    }
  };

  return (
    <div className="bg-stone-800 mt-24 flex items-center justify-center ">
      <div className="w-full max-w-[1200px] bg-[#000] rounded-3xl overflow-hidden shadow-2xl flex flex-col-reverse md:flex-row">
        <div className="w-full md:w-1/2 relative">
          <div className="absolute top-6 left-6 text-white text-2xl font-bold z-10">
            <h2 className="text-2xl md:text-4xl font-semibold mb-2">
              Tu Tienda
            </h2>
            <h2 className="text-2xl md:text-4xl font-semibold">
              de tecnología
            </h2>
          </div>
          <Image
            src="https://res.cloudinary.com/de41faltu/image/upload/v1738789748/Carrinho_de_compras_em_um_laptop_Conceito_de_compras_online_IA_generativa___Foto_Premium_nyymni.jpg"
            alt="Desert landscape"
            className="w-full h-full object-cover"
            fill
          />
          <div className="absolute inset-0 bg-indigo-600/10"></div>
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-white text-2xl md:text-4xl font-semibold mb-2">
              Iniciar Sesión
            </h1>
            <p className="text-gray-400 mb-8">
              ¿No tienes una cuenta?
              <a
                href="/register"
                className="text-cyan-600 hover:underline ml-3">
                Regístrate
              </a>
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Correo Electronico"
                name="email"
                className={`w-full bg-[#1c1c24] text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                  errors.email ? "border-red-500" : ""
                }`}
                required
                onChange={handleChange}
                value={formData.email}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
              {loginError && (
                <p className="text-red-500 text-xs italic">{loginError}</p>
              )}

              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  className={`w-full bg-[#1c1c24] text-white rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  required
                  onChange={handleChange}
                  value={formData.password}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                      />
                      <line x1="2" x2="22" y1="2" y2="22" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              )}

              <button
                className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-3 px-4 rounded-lg mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                type="submit">
                Iniciar Sesion
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
