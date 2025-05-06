export interface IProduct {
  
  id: number; 
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
  quantity:number
}

 export interface CartItemProps extends IProduct {
  quantity: number;
}
