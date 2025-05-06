"use client";
import React, { useContext } from "react";
import { UserContext } from "../components/context/userContext";
import Image from "next/image";
import OrderModal from "../order/page"; 

const ShoppingCart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartItem,
    calculateSubtotal,
    calculateShipping,
    calculateTotal,
    handleCheckout,
    showOrderModal,
    orders,
    setShowOrderModal,
  } = useContext(UserContext);

  const order = orders?.length > 0 ? orders[orders.length - 1] : null;

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto min-h-screen px-4 2xl:px-0">
        <h2 className="text-2xl font-bold ml-10 mb-4 text-gray-900 dark:text-white">
         Carrito de compras
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cart.length > 0 ? (
                cart.map(item => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <div className="flex items-center">
                        <div className="object-contain">
                          <Image
                            className="h-auto w-auto dark:hidden"
                            src={item.image}
                            alt={item.name}
                            width={60}
                            height={60}
                          />
                          <Image
                            className="hidden h-auto w-auto dark:block"
                            src={item.image}
                            alt={item.name}
                            width={60}
                            height={60}
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {item.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <button
                            type="button"
                            className="rounded-l-md border border-gray-300 bg-white px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                            onClick={() =>
                              updateCartItem(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}>
                            -
                          </button>
                          <input
                            type="text"
                            className="block w-16 rounded-none border-t border-b border-gray-300 bg-white px-3 py-2 text-center text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            type="button"
                            className="rounded-r-md border border-gray-300 bg-white px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                            onClick={() =>
                              updateCartItem(item.id, item.quantity + 1)
                            }>
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="ml-4 rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                          onClick={() => removeFromCart(item.id)}>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  El carrito de compras está vacío.
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 lg:mt-0 lg:w-full lg:max-w-md xl:max-w-lg mr-7">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Resumen del pedido
              </h3>
              <dl className="mt-6 space-y-4 text-sm font-medium">
                <div className="flex items-center justify-between">
                  <dt className="text-white dark:text-white">Sub-total</dt>
                  <dd className="text-gray-900 dark:text-white">
                    ${calculateSubtotal().toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600 dark:text-white">Envío</dt>
                  <dd className="text-gray-900 dark:text-white">
                    ${calculateShipping().toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    ${calculateTotal().toFixed(2)}
                  </dd>
                </div>
              </dl>
              <button
                type="button"
                className="mt-6 w-full rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                onClick={handleCheckout}>
                Proceder al pago
              </button>
            </div>
          </div>
        </div>
      </div>
      {showOrderModal && (
        <OrderModal order={order} onClose={() => setShowOrderModal(false)} />
      )}
    </section>
  );
};

export default ShoppingCart;
