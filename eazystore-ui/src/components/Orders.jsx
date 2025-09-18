import React from "react";
import { useLoaderData, redirect } from "react-router-dom";
import PageTitle from "./PageTitle";

export default function Orders() {
  const orders = useLoaderData() || [];

  function formatDate(isoDate) {
    if (!isoDate) return "N/A";
    return new Date(isoDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="min-h-[852px] container mx-auto px-6 py-12 font-primary dark:bg-darkbg">
      {orders.length === 0 ? (
        <p className="text-center text-2xl text-primary dark:text-lighter">
          No orders found.
        </p>
      ) : (
        <div className="space-y-6 mt-4">
          <PageTitle title="My Orders" />
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white dark:bg-gray-700 shadow-md rounded-md p-6"
            >
              <h2 className="text-xl font-semibold mb-2 text-primary dark:text-lighter">
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

              <div className="mt-4 space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center border-b pb-4">
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

// 模拟前端-only加载订单数据
export async function ordersLoader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) throw redirect("/login");

  // 模拟订单数据
  return [
    {
      orderId: "A123",
      status: "Delivered",
      totalPrice: 49.99,
      createdAt: "2025-09-14T10:30:00Z",
      items: [
        {
          productName: "Sticker Pack A",
          quantity: 2,
          price: 9.99,
          imageUrl:
            "https://via.placeholder.com/64?text=A",
        },
        {
          productName: "Sticker Pack B",
          quantity: 1,
          price: 29.99,
          imageUrl:
            "https://via.placeholder.com/64?text=B",
        },
      ],
    },
    {
      orderId: "B456",
      status: "Processing",
      totalPrice: 19.99,
      createdAt: "2025-09-15T14:00:00Z",
      items: [
        {
          productName: "Sticker Pack C",
          quantity: 1,
          price: 19.99,
          imageUrl:
            "https://via.placeholder.com/64?text=C",
        },
      ],
    },
  ];
}