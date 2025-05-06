"use client";
import React, { useState, useEffect } from "react";
import Card from "../components/card/card";
import { IProduct } from "../components/interface/IProducts";

interface ProductListProps {
  products: IProduct[];
  addToCart?: (item: IProduct) => void;
  selectedCategory: number | null;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  addToCart,
  selectedCategory,
}) => {
  const [displayedProducts, setDisplayedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (selectedCategory !== null) {
      setDisplayedProducts(
        products.filter(product => product.categoryId === selectedCategory)
      );
    } else {
      const randomProducts = products
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);
      setDisplayedProducts(randomProducts);
    }
  }, [selectedCategory, products]);

  return (
    <div className="max-h-screen overflow-y-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayedProducts.length > 0 ? (
          displayedProducts.map(item => (
            <Card key={item.id} data={item} addToCart={addToCart} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
