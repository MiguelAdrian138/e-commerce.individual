"use client";
import React from "react";
import {
  UserGroupIcon,
  HomeIcon,
  ShoppingBagIcon,
  BuildingStorefrontIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

interface LinkItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const links: LinkItem[] = [
  { name: "Inicio", href: "/home", icon: HomeIcon },
  {
    name: "Productos",
    href: "/products",
    icon: BuildingStorefrontIcon,
  },
  { name: "Carrito de compras", href: "/cart", icon: ShoppingBagIcon },
  { name: "Usuario", href: "/dashboard", icon: UserGroupIcon },
  { name: "Registrarse", href: "/register", icon: IdentificationIcon },
];

interface NavLinkProps {
  isLoggedIn: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ isLoggedIn }) => {
  const pathname = usePathname();
  const { id } = useParams();
  const detalleProducto = `/products/${id}`;

  return (
    <>
      {links.map(link => {
        if (link.name === "Usuario" && !isLoggedIn) return null;
        if (link.name === "Inicio" && !isLoggedIn) return null;
        if (link.name === "Carrito de compras" && !isLoggedIn) return null;
        if (link.name === detalleProducto && !isLoggedIn) return null;

        if (link.name === "Landing" ) return null;
        if (link.name === "Registrarse" && isLoggedIn) return null;

        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-0 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              { "bg-sky-100 text-blue-600": pathname === link.href }
            )}>
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
};

export default NavLink;
