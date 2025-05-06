import React, { useState } from "react";
import { Order } from "../components/interface/IOrder";

interface OrderModalProps {
  order: Order | null;
  onClose: () => void;
  showDetails?: boolean;
}

const OrderModal: React.FC<OrderModalProps> = ({
  order,
  onClose,
  showDetails = true,
}) => {
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
    onClose();
  };

  if (!showModal || !order) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white p-6">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-xl leading-6 font-semibold text-gray-900">
                  Orden #{order.id}
                </h3>
                <div className="mt-4">
                  <p className="text-md text-gray-700">
                    Fecha: {new Date(order.date).toLocaleString()}
                  </p>
                  <p className="text-md text-gray-700">
                    Estado: {order.status}
                  </p>
                  <p className="text-md text-gray-700 font-semibold">
                    Productos:
                  </p>
                  <ul className="list-disc pl-6">
                    {order.products.map((product, index) => (
                      <li key={index} className="text-md text-gray-700">
                        {product.name}
                        {showDetails &&
                          ` - Cantidad: ${
                            product.quantity || 1
                          } - Precio: $${product.price.toFixed(2)}`}
                      </li>
                    ))}
                  </ul>

                  {showDetails && (
                    <p className="text-md text-gray-700 font-semibold">
                      Total: ${order?.total?.toFixed(2) || "0.00"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-md px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleCloseModal}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
