import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Login from "./components/Login.jsx";
import Cart from "./components/Cart.jsx";
import Home from "./components/Home.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import CheckoutForm from "./components/CheckoutForm.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Register from "./components/Register.jsx";
import OrderSuccess from "./components/OrderSuccess.jsx";
import Orders from "./components/Orders.jsx";

import store from "./store/store.js";
import { Provider } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// ✅ Contact form action function
import { contactAction } from "./actions/contactAction.js";
import Profile, {
  profileLoader,
  profileAction,
} from "./components/Profile.jsx";

const stripePromise = loadStripe(
  "pk_test_51RJQvF4PbYqEP0SGCcnUiXIBFtwmjlfv7CvYdwgLRyrs3pLxejSAYED3goAAkxwKVkgP70GvS0LkzhIHWSfpHWYE00jR1SrCza"
);

// ✅ Routes with contactAction wired
const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Navigate to="/home" replace />} />
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} action={contactAction} />{" "}
    {/* 👈 fixed */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/products/:productId" element={<ProductDetail />} />
    <Route
      path="/profile"
      element={<Profile />}
      loader={profileLoader}
      action={profileAction}
    />
    {/* Protected routes */}
    <Route element={<ProtectedRoute />}>
      <Route path="/checkout" element={<CheckoutForm />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/orders" element={<Orders />} /> {/* ✅ 添加这一行 */}
    </Route>
    <Route path="*" element={<ErrorPage />} />
  </Route>
);

const appRouter = createBrowserRouter(routeDefinitions);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <RouterProvider router={appRouter} />
      </Provider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable
        pauseOnHover
        theme={localStorage.getItem("theme") === "dark" ? "dark" : "light"}
        transition={Bounce}
      />
    </Elements>
  </StrictMode>
);
