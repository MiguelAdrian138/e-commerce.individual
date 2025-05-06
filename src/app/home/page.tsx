"use client";
import React, { useContext, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { UserContext } from "../components/context/userContext";
import {IProduct} from "../components/interface/IProducts"



const Home: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { addToCart } = useContext(UserContext);

 const fetchData = useCallback(async () => {
   try {
     const response = await fetch("http://localhost:3030/products/");
     if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
     }
     const data: IProduct[] = await response.json();
     setProducts(getRandomProducts(data, 3));
   } catch (error) {
     console.error("Error fetching data:", error);
   }
 }, []);

  function getRandomProducts(products: IProduct[], count: number): IProduct[] {
    const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
    return shuffledProducts.slice(0, count);
  }

  function scrollToSection(index: number) {
    const sections = document.querySelectorAll(".scroll-section");
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="bg-stone-800 text-white h-screen">
      <div className="scroll-container h-screen scroll-snap-y-mandatory">
        {products.length > 0 && (
          <>
            {products.map(product => (
              <section
                key={product.id}
                className="scroll-section relative h-screen flex flex-col md:flex-row snap-start">
                <div className="w-full h-full">
                  <div className="relative overflow-hidden group shine-effect w-full h-full">
                    <div className="relative w-full h-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-scale-down transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/20 transition-opacity duration-500 group-hover:opacity-0"></div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 h-full flex items-center justify-center p-8 bg-neutral-950">
                  <div className="max-w-lg float-animation">
                    <h2 className="mt-4 text-5xl md:text-7xl font-bold leading-none">
                      {product.name}
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-400 mb-4">
                      {product.description}
                    </p>
                    <p className="text-lg font-bold text-white mb-4">
                      ${product.price.toFixed(2)}
                    </p>
                    <button
                      onClick={() => addToCart({ ...product, quantity: 1 })}
                      className="uppercase py-2 px-4 rounded-lg bg-indigo-500 border-2 border-transparent text-white text-md hover:bg-indigo-600">
                      Añadir al Carrito
                    </button>
                  </div>
                </div>
              </section>
            ))}
          </>
        )}

        <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
          {products.map((product, index) => (
            <button
              key={product.id} 
              onClick={() => scrollToSection(index)}
              className="w-3 h-3 rounded-full bg-white/20 hover:bg-white transition-colors hover:scale-150"
              title={`Go to section ${index + 1}`}></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
