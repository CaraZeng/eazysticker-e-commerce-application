import Header from "./components/Header";
import Footer from "./components/footer/Footer";
import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";

console.log("VITE_API_BASE_URL = ", import.meta.env.VITE_API_BASE_URL);

function App() {
  const navigation = useNavigation();
  return (
    <>
      <Header />
      {navigation.state === "loading" ? (
        <div className="flex items-center justify-center min-h-[852px]">
          <span className="text-4xl font-semibold text-primary dark:text-light">
            Loading...
          </span>
        </div>
      ) : (
        <Outlet />
      )}

      <Footer />
    </>
  );
}

export default App;
