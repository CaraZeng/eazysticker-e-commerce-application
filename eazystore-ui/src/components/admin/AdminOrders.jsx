import React from "react";
import { useLoaderData, useRevalidator, redirect } from "react-router-dom";
import PageTitle from "../PageTitle";
import { toast } from "react-toastify";

export default function AdminOrders() {
  const orders = useLoaderData();
  const revalidator = useRevalidator();

  function formatDate(isoDate) {
    if (!isoDate) return "N/A";
    return new Date(isoDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const handleConfirm = async (orderId) => {
    const orders = JSON.parse(localStorage.getItem("adminOrders") || "[]");
    const updated = orders.map((order) =>
      order.orderId === orderId ? { ...order, status: "Confirmed" } : order
    );
    localStorage.setItem("adminOrders", JSON.stringify(updated));
    toast.success("Order confirmed.");
    revalidator.revalidate();
  };

  const handleCancel = async (orderId) => {
    const orders = JSON.parse(localStorage.getItem("adminOrders") || "[]");
    const updated = orders.map((order) =>
      order.orderId === orderId ? { ...order, status: "Cancelled" } : order
    );
    localStorage.setItem("adminOrders", JSON.stringify(updated));
    toast.success("Order cancelled.");
    revalidator.revalidate();
  };

  return (
    <div className="min-h-[852px] container mx-auto px-6 py-12 font-primary dark:bg-darkbg">
      {orders.length === 0 ? (
        <p className="text-center text-2xl text-primary dark:text-lighter">
          No orders found.
        </p>
      ) : (
        <div className="space-y-6 mt-4">
          <PageTitle title="Admin Orders Management" />
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white dark:bg-gray-700 shadow-md rounded-md p-6"
            >
              <div className="flex flex-wrap items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-primary dark:text-lighter">
                    Order #{order.orderId}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Status:{" "}
                    <span className="font-medium text-gray-800 dark:text-lighter">
                      {order.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Price:{" "}
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      ${order.totalPrice}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Date:{" "}
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {formatDate(order.createdAt)}
                    </span>
                  </p>
                </div>

                <div className="flex space-x-4 mt-4 lg:mt-0">
                  <button
                    onClick={() => handleConfirm(order.orderId)}
                    className="px-6 py-2 text-white dark:text-dark text-md rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleCancel(order.orderId)}
                    className="px-6 py-2 text-white text-md rounded-md transition duration-200 bg-red-500 hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center border-b pb-4 last:border-b-0"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">
                        {item.productName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Price: ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 模拟加载订单列表（从 localStorage）
export async function adminOrdersLoader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "admin") {
    throw redirect("/login");
  }

  // 初始化模拟数据
  let existing = JSON.parse(localStorage.getItem("adminOrders") || "[]");
  if (existing.length === 0) {
    existing = [
      {
        orderId: "A123",
        status: "Pending",
        totalPrice: 59.99,
        createdAt: "2025-09-12T10:30:00Z",
        items: [
          {
            productName: "Sticker Pack A",
            quantity: 2,
            price: 9.99,
            imageUrl: "https://via.placeholder.com/64?text=A",
          },
          {
            productName: "Sticker Pack B",
            quantity: 1,
            price: 39.99,
            imageUrl: "https://via.placeholder.com/64?text=B",
          },
        ],
      },
      {
        orderId: "B456",
        status: "Pending",
        totalPrice: 19.99,
        createdAt: "2025-09-13T15:00:00Z",
        items: [
          {
            productName: "Sticker Pack C",
            quantity: 1,
            price: 19.99,
            imageUrl: "https://via.placeholder.com/64?text=C",
          },
        ],
      },
    ];
    localStorage.setItem("adminOrders", JSON.stringify(existing));
  }

  return existing;
}