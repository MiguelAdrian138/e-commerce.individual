"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { CartItemProps } from "@/app/components/interface/IProducts";
import React from "react";
import { UserContext } from "@/app/components/context/userContext";
import { useParams } from "next/navigation";
import { Favorite } from "@/app/components/interface/IFavorite";
import {
  BookmarkIcon,
  BookmarkSlashIcon,
} from "@heroicons/react/24/outline";

const ProductDetails: React.FC = () => {
  const { addToCart, favorites, addToFavorites, removeFromFavorites } =
    useContext(UserContext);
  const [product, setProduct] = useState<CartItemProps | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3030/products/${id}`);
        if (!res.ok) {
          throw new Error("Error en la respuesta de la API");
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setIsFavorite(favorites.some(fav => fav.id === product.id));
    }
  }, [product, favorites]);

  const handleToggleFavorite = () => {
    if (product) {
      const favoriteProduct: Favorite = {
        id: product.id,
        name: product.name,
        image: product.image,
      };
      if (isFavorite) {
        removeFromFavorites(product.id);
      } else {
        addToFavorites(favoriteProduct);
      }
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-stone-800 flex flex-col min-h-screen">
      <div className="container mx-auto px-6 flex relative py-16 flex-1">
        <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative ">
          <span className="w-20 h-2 bg-gray-800 dark:bg-white  mb-12"></span>
          <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800">
            {product.name}
          </h1>
          <p className="text-xl text-white">{product.description}</p>
          <p className="text-xl  text-white">{product.price}.00</p>
          <div className="flex mt-8">
            <a
              href="#"
              className="uppercase py-2 px-4 rounded-lg bg-gray-900 border-2 border-transparent text-white border-neutral-200 text-md mr-4 hover:bg-sky-100 hover:text-blue-600"
              onClick={() => addToCart(product)}>
              Añadir al Carrito
            </a>
            <button
              className={`font-extrabold p-2 rounded-xl transition-colors mb-2 w-1/12 flex items-center justify-center ${
                isFavorite
                  ? "bg-red-500 text-white"
                  : "bg-sky-300 text-white hover:bg-gray-900 hover:text-stone-300"
              }`}
              onClick={handleToggleFavorite}>
              {isFavorite ? (
                <BookmarkSlashIcon className="h-7 w-7" />
              ) : (
                <BookmarkIcon className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
        <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative flex-1">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="max-w-xs md:max-w-sm m-auto h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
