import React from "react";
import { categoriesToPreLoad } from "../interface/ICategories";

interface SidebarProps {
  onSelectCategory: (categoryId: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectCategory }) => {
  return (
    <div
      className="bg-slate-600 text-gray-100 p-4 rounded-lg shadow-lg h-[fit-content] mt-12 ml-6 "
      style={{ width: "250px" }}>
      <h2 className="text-lg font-bold mb-4">Categorías</h2>
      <nav>
        <ul>
          {categoriesToPreLoad.map(category => (
            <li
              key={category.name}
              onClick={() => onSelectCategory(category.id)}
              className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6ZM14 6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V6ZM4 16a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2ZM14 16a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2Z"
                />
              </svg>
              {category.name}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
