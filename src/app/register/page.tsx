"use client";
import { useState, useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import { UserContext } from "../components/context/userContext";
import Link from "next/link";
import Image from "next/image";
import {
  validateEmail,
  validatePassword,
  validateName,
  validateAddress,
  validatePhone,
} from "../utils/validations";

interface FormData {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
}

const RegistrationForm: React.FC = () => {
  const { register } = useContext(UserContext);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    if (!validateName(formData.name)) {
      setErrors(prev => ({ ...prev, name: "Nombre inválido" }));
      hasErrors = true;
    }
    if (!validateAddress(formData.address)) {
      setErrors(prev => ({ ...prev, address: "Dirección inválida" }));
      hasErrors = true;
    }
    if (!validatePhone(formData.phone)) {
      setErrors(prev => ({ ...prev, phone: "Teléfono inválido" }));
      hasErrors = true;
    }

    if (hasErrors) {
      return; 
    }

    setLoading(true);
    try {
      await register(formData);
      setFormData({
        email: "",
        password: "",
        name: "",
        address: "",
        phone: "",
      });
      setErrors({}); 
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone-800 mt-10 flex items-center justify-center">
      <div className="w-full max-w-[1200px] bg-[#000] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 relative">
          <Link
            href="/"
            className="absolute top-6 left-6 text-white text-2xl font-bold z-10">
            Adrian Shop
          </Link>
          <div className="relative h-full">
            <Image
              src="https://res.cloudinary.com/de41faltu/image/upload/v1738789748/Carrinho_de_compras_em_um_laptop_Conceito_de_compras_online_IA_generativa___Foto_Premium_nyymni.jpg"
              alt="Desert landscape"
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-purple-900/30"></div>
            <div className="absolute bottom-12 left-12 text-white">
              <h2 className="text-2xl md:text-4xl font-semibold mb-2">
                Tu Tienda
              </h2>
              <h2 className="text-2xl md:text-4xl font-semibold">
                de tecnología.
              </h2>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-white text-2xl md:text-4xl font-semibold mb-2">
              Registrate..
            </h1>
            <p>
              Si ya estás registrado, inicia sesión
              <Link
                href="/login"
                className="text-blue-500 hover:underline ml-3">
                aquí
              </Link>
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Correo Electronico"
                className={`w-full bg-[#1c1c24] text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                  errors.email ? "border-red-500" : ""
                }`}
                name="email"
                required
                onChange={handleChange}
                value={formData.email}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}

              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className={`w-full bg-[#1c1c24] text-white rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              )}

              <input
                type="text"
                placeholder="Nombre"
                name="name"
                className={`w-full bg-[#1c1c24] text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                  errors.name ? "border-red-500" : ""
                }`}
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic">{errors.name}</p>
              )}

              <input
                type="text"
                placeholder="Dirección"
                name="address"
                className={`w-full bg-[#1c1c24] text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                  errors.address ? "border-red-500" : ""
                }`}
                value={formData.address}
                onChange={handleChange}
                required
              />
              {errors.address && (
                <p className="text-red-500 text-xs italic">{errors.address}</p>
              )}

              <input
                type="tel"
                placeholder="Teléfono"
                name="phone"
                className={`w-full bg-[#1c1c24] text-white rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                  errors.phone ? "border-red-500" : ""
                }`}
                required
                pattern="[0-9]*"
                onChange={handleChange}
                value={formData.phone}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs italic">{errors.phone}</p>
              )}

              <div className="mt-6 text-center">
                <button
                  type="submit"
                  className="py-2 px-6 bg-white hover:bg-gray-200 text-gray-700 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  disabled={loading}>
                  {loading ? "Registrando..." : "Registrarse"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
