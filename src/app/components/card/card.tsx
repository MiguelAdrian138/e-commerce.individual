import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { CartItemProps } from "../interface/IProducts";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "../interface/IProducts";
import {
  ShoppingCartIcon,
  DocumentMagnifyingGlassIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
} from "@heroicons/react/24/outline";

interface CardProps {
  data: CartItemProps;
  addToCart?: (item: IProduct) => void;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const { addToCart, favorites, addToFavorites, removeFromFavorites } =
    useContext(UserContext);
  const { id, name, price, image } = data;
  const isFavorite = favorites.some(favorite => favorite.id === id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites({ id, name, image });
    }
  };

  return (
    <article className="flex flex-col items-center justify-between border-4 border-black bg-slate-600 p-4 shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-b hover:from-gray-200 hover:to-indigo-500 hover:shadow-xl w-full max-w-xs">
      <div className="w-full h-40 rounded-2xl overflow-hidden relative">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover" 
        />
      </div>
      <div className="flex justify-between items-center w-full mt-3">
        <p className="font-extrabold text-lg text-slate-300 truncate">{name}</p>
        <p className="text-lg text-slate-300">${price}</p>
      </div>
      <div className="flex gap-2 mt-4 w-full">
        <div className="relative group flex-grow">
          <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-10 bg-gray-700 text-white text-sm rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Carrito
          </span>
          <button
            className="bg-gray-900 font-extrabold p-2 rounded-xl text-stone-300 hover:bg-sky-200 hover:text-gray-700 transition-colors mb-2 w-full flex items-center justify-center"
            onClick={() => addToCart(data)}>
            <ShoppingCartIcon className="h-7 w-7" />
          </button>
        </div>

        <div className="relative group flex-grow">
          <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-10 bg-gray-700 text-white text-sm rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Ver más
          </span>
          <Link href={`/products/${data.id}`}>
            <button className="bg-sky-500 font-extrabold p-2 rounded-xl text-gray-700 hover:bg-gray-600 hover:text-stone-300 transition-colors mb-2 w-full flex items-center justify-center">
              <DocumentMagnifyingGlassIcon className="h-7 w-7" />
            </button>
          </Link>
        </div>

        <div className="relative group flex-grow">
          <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-10 bg-gray-700 text-white text-sm rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {isFavorite ? "Eliminar" : "Favorito"}
          </span>
          <button
            className={`font-extrabold p-2 rounded-xl transition-colors mb-2 w-full flex items-center justify-center ${
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-white text-sky-800 hover:bg-gray-900 hover:text-stone-300"
            }`}
            onClick={handleFavoriteToggle}>
            {isFavorite ? (
              <BookmarkSlashIcon className="h-7 w-7" />
            ) : (
              <BookmarkIcon className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default Card;
