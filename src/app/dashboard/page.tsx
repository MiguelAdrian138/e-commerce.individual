"use client";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../components/context/userContext";
import { Order } from "../components/interface/IOrder";
import OrderModal from "../order/page";
import Favorites from "../components/favorites/page";

const Dashboard: React.FC = () => {
  const { userInfo, isAuthenticated, orders, setOrders } =
    useContext(UserContext);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`http://localhost:3030/users/orders`, {
            headers: {
              Authorization: token,
            },
          });

          if (response.ok) {
            const ordersData = await response.json();
            setOrders(ordersData);
          } else {
            console.error("Error fetching orders:", response.status);
            setError("No se pudieron obtener las órdenes.");
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
          setError("Ocurrió un error al obtener los datos.");
        }
      }
    };

    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated, setOrders]);

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex flex-col flex-1 overflow-y-auto p-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 flex justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Bienvenido, {userInfo.name}
            </h1>
          </div>
          <div className="text-gray-300 text-lg text-right">
            <p>Nro. de usuario: {userInfo.id}</p>
            <p>Correo: {userInfo.email}</p>
            <p>Dirección: {userInfo.address}</p>
            <p>Teléfono: {userInfo.phone}</p>
          </div>
        </div>

        <div className="flex w-full space-x-6">
          <div className="w-1/2">
            <h2 className="text-xl font-bold text-white text-center mb-4">
              Órdenes
            </h2>
            {error && <p className="text-red-400">{error}</p>}
            {orders && orders.length > 0 ? (
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {orders.map(ord => (
                    <div
                      key={ord.id}
                      className="bg-gray-700 p-4 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
                      onClick={() => handleOrderClick(ord)}>
                      <h3 className="text-lg font-semibold text-white text-center">
                        Orden #{ord.id}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-300">No hay órdenes disponibles.</p>
            )}
          </div>

          <div className="w-1/2">
            <h2 className="text-xl font-bold text-white text-center mb-4">
              Favoritos
            </h2>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg z-10">
              <Favorites />
            </div>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={handleCloseModal}
          showDetails={false}
        />
      )}
    </div>
  );
};

export default Dashboard;
