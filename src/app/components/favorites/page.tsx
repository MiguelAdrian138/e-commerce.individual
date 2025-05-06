"use client";
import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import Image from "next/image";
import { BookmarkSlashIcon } from "@heroicons/react/24/outline";

const Favorites: React.FC = () => {
  const { favorites, removeFromFavorites } = useContext(UserContext);
  console.log(favorites);

  return (
    <div className="flex flex-col p-4">
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map(favorite => (
            <article
              key={favorite.id}
              className="flex flex-col items-center justify-between border-4 border-black bg-slate-600 p-4 shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-b hover:from-gray-200 hover:to-indigo-500 hover:shadow-xl w-full max-w-xs">
              <div className="w-full h-40 rounded-2xl overflow-hidden relative">
                <Image
                  src={favorite.image}
                  alt={favorite.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex justify-between items-center w-full mt-3">
                <p className="font-extrabold text-lg text-slate-300 truncate">
                  {favorite.name}
                </p>
              </div>
              <button
                onClick={() => removeFromFavorites(favorite.id)}
                className="mt-4 bg-red-500 font-extrabold p-2 rounded-xl text-white hover:bg-red-600 transition-colors w-full flex items-center justify-center">
                <BookmarkSlashIcon className="h-7 w-7" />
              </button>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-white">No hay productos favoritos.</p>
      )}
    </div>
  );
};

export default Favorites;
