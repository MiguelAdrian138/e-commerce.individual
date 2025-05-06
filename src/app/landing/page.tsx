"use client";
import React, { useContext, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { UserContext } from "../components/context/userContext";
import { IProduct } from "../components/interface/IProducts";

const Landing: React.FC = () => {
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
      sections[index].scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="bg-stone-800 text-white h-screen overflow-hidden">
      <div className="scroll-container flex flex-row h-screen  snap-x snap-mandatory">
        {products.length > 0 && (
          <>
            {products.map(product => (
              <section
                key={product.id}
                className="scroll-section relative flex-shrink-0 w-screen snap-center flex flex-col md:flex-row">
                <div className="w-full h-full">
                  <div className="relative overflow-hidden group shine-effect w-full h-full">
                    <div className="relative h-[calc(140vh-6rem)]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-scale-down transition-all duration-1000 group-hover:scale-110 mt-2 group-hover:rotate-1"
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
                <div className="absolute top-0 left-0 w-full bg-indigo-600 p-9 z-10 overflow-hidden">
                  <div className="container mx-auto">
                    <div className="-mx-4 flex flex-wrap items-center">
                      <div className="w-full px-3 lg:w-1/2">
                        <div className="text-center lg:text-left">
                          <div className="mb-10 lg:mb-0">
                            <h1 className="mt-0 mb-3 text-3xl font-bold leading-tight sm:text-4xl md:text-[40px] text-white">
                              Bienvenido a Nuestra Tienda
                            </h1>
                            <p className="w-full text-base font-medium leading-relaxed sm:text-lg text-white">
                              Explora nuestros productos y añade lo que más te
                              guste al carrito.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full px-4 lg:w-1/2">
                        <div className="text-center lg:text-right">
                          <a
                            className="font-semibold rounded-lg mx-auto inline-flex items-center justify-center bg-white text-zinc-700 py-4 px-9 hover:bg-opacity-90"
                            href="/login">
                            Comienza a Comprar
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </>
        )}

        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-3 sm:gap-4 z-10">
          {products.map((product, index) => (
            <button
              key={product.id}
              onClick={e => {
                e.preventDefault();
                scrollToSection(index);
              }}
              className="w-3 h-3 rounded-full bg-white/20 hover:bg-white transition-colors hover:scale-150"
              title={`Go to section ${index + 1}`}></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
