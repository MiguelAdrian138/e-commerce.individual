"use client";
import { useEffect, useState } from "react";
import ProductList from "../productsList/page";
import Sidebar from "../components/sidebar/page"; 
import { IProduct } from "../components/interface/IProducts";


const Products: React.FC = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3030/products/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="flex">
      <Sidebar onSelectCategory={handleSelectCategory} />
      <div className="ml-10 mt-10 flex-1">
        <ProductList
          products={data}
          addToCart={() => {}}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
};

export default Products;
