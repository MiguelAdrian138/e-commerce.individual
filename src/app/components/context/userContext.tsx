"use client";
import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import CartItem from "../interface/ICartItem";
import { Order } from "../interface/IOrder";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../type/types";
import {Favorite} from '../interface/IFavorite'

interface FormData {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
}

interface UserContextType {
  loading: boolean;
  isAuthenticated: boolean;
  orders: Order[] | [];
  setOrders: Dispatch<SetStateAction<Order[]>>;
  userInfo: {
    id: number;
    email: string;
    name: string;
    address?: string;
    phone?: string;
  };
  setUserInfo: Dispatch<
    SetStateAction<{ id: number; email: string; name: string }>
  >;
  login: (email: string, password: string) => Promise<void>;
  register: (formData: FormData) => Promise<void>;
  logout: () => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateCartItem: (id: number, quantity: number) => void;
  calculateSubtotal: () => number;
  calculateShipping: () => number;
  calculateTotal: () => number;
  handleCheckout: () => Promise<void>;
  showOrderModal: boolean;
  setShowOrderModal: Dispatch<SetStateAction<boolean>>;
  favorites: Favorite[];
  setFavorites: React.Dispatch<React.SetStateAction<Favorite[]>>;
  addToFavorites: (favorite: Favorite) => void;
  removeFromFavorites: (id: number) => void;
}

export const UserContext = createContext<UserContextType>({
  loading: true,
  isAuthenticated: false,
  orders: [],
  setOrders: () => {},
  userInfo: { id: 0, email: "", name: "" },
  setUserInfo: () => {},
  login: async () => {},
  register: async () => {},
  logout: () => {},
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItem: () => {},
  calculateSubtotal: () => 0,
  calculateShipping: () => 0,
  calculateTotal: () => 0,
  handleCheckout: async () => {},
  showOrderModal: false,
  setShowOrderModal: () => {},
  favorites: [],
  setFavorites: () => {},
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    id: number;
    email: string;
    name: string;
    address?: string;
    phone?: string;
  }>({
    id: 0,
    email: "",
    name: "",
  });
  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
     localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [cart, favorites]);

 const login = async (email: string, password: string): Promise<void> => {
   setLoading(true);
   try {
     const response = await fetch("http://localhost:3030/users/login", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ email, password }),
     });

     if (!response.ok) {
       const error = await response.json();
       throw new Error(error.message || "Error desconocido");
     }

     const { token } = await response.json();
     localStorage.setItem("token", token);

     const decodedToken = jwtDecode<CustomJwtPayload>(token);
     const userId = decodedToken.userId;

     interface User {
       email: string;
       name: string;
       address: string;
       phone: string;
     }

     const storedUserData: User[] = JSON.parse(
       localStorage.getItem("userData") || "[]"
     );

     const foundUser: User | undefined = storedUserData.find(
       user => user.email === email
     );

     if (!foundUser) {
       throw new Error("Usuario no encontrado en los datos almacenados.");
     }

     const userData = {
       id: userId,
       email: foundUser.email,
       name: foundUser.name,
       address: foundUser.address,
       phone: foundUser.phone,
     };

     setUserInfo(userData);
     localStorage.setItem("userInfo", JSON.stringify(userData));
     setIsAuthenticated(true);

     await router.push("/home");
   } catch (error) {
     Swal.fire({
       icon: "error",
       title: "Error de inicio de sesión",
       text: (error as { message: string }).message,
     });
   } finally {
     setLoading(false);
   }
 };

 const register = async (formData: FormData): Promise<void> => {
   setLoading(true);
   try {
     const response = await fetch("http://localhost:3030/users/register", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(formData),
     });

     if (!response.ok) {
       const error = await response.json();
       throw new Error(error.message || "Error desconocido");
     }

     const responseData = await response.json();
     console.log(responseData); 
     
     const existingUserData = JSON.parse(
       localStorage.getItem("userData") || "[]"
     );

     
     const newUser = {
       email: formData.email,
       name: formData.name,
       address: formData.address,
       phone: formData.phone,
     };

     
     const updatedUserData = [...existingUserData, newUser];

     
     localStorage.setItem("userData", JSON.stringify(updatedUserData));

     Swal.fire({
       icon: "success",
       title: "Registro exitoso",
       text: "Te has registrado correctamente. Puedes iniciar sesión ahora.",
     });

     await router.push("/login");
   } catch (error) {
     Swal.fire({
       icon: "error",
       title: "Error de registro",
       text: (error as { message: string }).message,
     });
   } finally {
     setLoading(false);
   }
 };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");

    setIsAuthenticated(false);
    setCart([]);
    Swal.fire({
      icon: "success",
      title: "Sesión cerrada",
      text: "Has cerrado sesión exitosamente.",
    });
    router.push("/landing");
  };

  const addToCart = (item: CartItem) => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: "warning",
        title: "Inicia sesión",
        text: "Para agregar productos al carrito, debes iniciar sesión.",
        showCancelButton: true,
        confirmButtonText: "Iniciar sesión",
      }).then(result => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...existingItem, quantity: existingItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
    Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: `${item.name} ha sido agregado al carrito.`,
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
    Swal.fire({
      icon: "error",
      title: "Producto eliminado",
      text: "El producto ha sido eliminado del carrito.",
    });
  };

  const updateCartItem = (id: number, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const calculateSubtotal = useCallback(() => {
    return cart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  }, [cart]);

  const calculateShipping = useCallback(() => {
    return 2.99;
  }, []);

  const calculateTotal = useCallback(() => {
    return calculateSubtotal() + calculateShipping();
  }, [calculateSubtotal, calculateShipping]);

  const handleCheckout = useCallback(async () => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: "warning",
        title: "Inicia sesión",
        text: "Necesitas iniciar sesión para realizar la compra.",
        confirmButtonText: "Iniciar sesión",
      }).then(result => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Usuario no autenticado",
      });
      return;
    }

    try {
      const orderData = {
        userId: jwtDecode<CustomJwtPayload>(token).userId,
        products: cart.map(item => item.id),
        total: calculateTotal(),
      };

      const productChecks = await Promise.all(
        orderData.products.map(id =>
          fetch(`http://localhost:3030/products/${id}`).then(res => res.ok)
        )
      );

      if (productChecks.includes(false)) {
        throw new Error("Uno o más productos no existen en la base de datos.");
      }

      const response = await fetch(`http://localhost:3030/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al crear la orden");
      }

      const newOrder: Order = await response.json();
      newOrder.products = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image,
      }));
      newOrder.total = calculateTotal();
      setOrders(prevOrders => [...prevOrders, newOrder]);
      setCart([]);
      Swal.fire({
        title: "¡Compra realizada!",
        text: "Tu pedido está en camino.",
        icon: "success",
        confirmButtonText: "Ver orden",
        showCancelButton: true,
        cancelButtonText: "Cerrar",
      }).then(result => {
        if (result.isConfirmed) {
          setShowOrderModal(true);
        } else {
          router.push("/");
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al crear la orden",
        text: (error as { message: string }).message,
      });
    }
  }, [isAuthenticated, cart, router, calculateTotal, setOrders]);

  const addToFavorites = (favorite: Favorite) => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: "warning",
        title: "Inicia sesión",
        text: "Para agregar productos a favoritos, debes iniciar sesión.",
        showCancelButton: true,
        confirmButtonText: "Iniciar sesión",
      }).then(result => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
      return;
    }
    setFavorites(prevFavorites => {
      if (!prevFavorites.some(fav => fav.id === favorite.id)) {
        const updatedFavorites = [...prevFavorites, favorite];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return updatedFavorites;
      }
      return prevFavorites;
    });
  };

   const removeFromFavorites = (id: number) => {
     setFavorites(prevFavorites => {
       const updatedFavorites = prevFavorites.filter(fav => fav.id !== id);
       localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); 
       return updatedFavorites;
     });
   };

  return (
    <UserContext.Provider
      value={{
        loading,
        isAuthenticated,
        orders,
        setOrders,
        userInfo,
        setUserInfo,
        login,
        register,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        calculateSubtotal,
        calculateShipping,
        calculateTotal,
        handleCheckout,
        showOrderModal,
        setShowOrderModal,
        favorites,
        setFavorites,
        addToFavorites,
        removeFromFavorites
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
