import { IProduct } from "./IProducts";

export interface CardProps {
   data: {
     id: number;
     name: string;
     price: number;
     image: string;
   };
   addToCart?: (item: IProduct) => void;
 }