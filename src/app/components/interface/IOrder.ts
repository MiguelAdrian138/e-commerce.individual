import CartItem from "./ICartItem";

export interface Order {
  id: number;
  userId: number;
  date: string;
  status: string;
  products: CartItem[];
  total?: number;
}
