"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import NavLink from "./navLink";
import Link from "next/link";
import { UserContext } from "../context/userContext";
import {
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon, 
} from "@heroicons/react/24/outline";

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useContext(UserContext);
  const router = useRouter();

  const handleLoginLogout = async () => {
    if (isAuthenticated) {
      await logout();
    } else {
      await router.push("/login");
    }
  };

   const storeLink = isAuthenticated ? "/home" : "/";

  return (
    <div className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href={storeLink} className="text-white font-bold text-xl">
            🛒Adrian Shop
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <NavLink isLoggedIn={isAuthenticated} />
          <a
            href="#"
            onClick={handleLoginLogout}
            className="text-gray-400 hover:text-white font-medium flex items-center gap-1">
            {isAuthenticated ? (
              <>
                <ArrowLeftOnRectangleIcon className="h-7 w-7" />
                Cerrar Sesión
              </>
            ) : (
              <>
                <ArrowRightOnRectangleIcon className="h-7 w-7" />
                Iniciar Sesión
              </>
            )}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
