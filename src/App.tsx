import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Register from "./pages/Register";
import Orders from "./components/Cart";
import Login from "./pages/Login";
import { createContext, useEffect, useState } from "react";
import Product from "./pages/Product";
import data from "./data.json";
import Checkout from "./components/Checkout";
import { IProductData, IOrders } from "./types.d";

export const orderContext = createContext<IOrders[]>([]);

function App() {
  const [regWindow, setRegWindow] = useState<boolean>(true);
  const [loginWindow, setLoginWindow] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IProductData[]>([]);
  const [orderActive, setOrderActive] = useState(false);
  const [orders, setOrders] = useState<IOrders[]>([]);

  useEffect(() => {
    const results = data.filter((value) =>
      value.name.toLowerCase().includes(searchValue.toLowerCase().trim())
    );
    setSearchResults(results);
  }, [searchValue]);

  function handleRegWindow() {
    setRegWindow((prev) => !prev);
    console.log(regWindow);
  }
  function handleLoginWindow() {
    setLoginWindow((prev) => !prev);
    console.log(regWindow);
  }

  function handleRemoveAll() {
    setOrders([]);
  }
  useEffect(() => {
    if (window.localStorage.getItem("orders"))
      window.localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);
  function updateOrders(orders: IOrders[], product: IProductData) {
    return orders.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
    );
  }
  function handleRemoveProduct(product: IProductData) {
    const productExist = orders.find((item) => item?.id === product?.id);
    if (productExist) {
      if (productExist.quantity === 1) {
        setOrders(orders.filter((item) => item.id !== product.id));
      } else {
        setOrders(updateOrders(orders, product));
      }
    } else {
      console.warn("Product not found in orders");
    }
  }
  const handleDeleteOrder = (product: IProductData) => {
    const productExist = orders.find((item) => item?.id === product?.id);
    if (productExist) {
      setOrders(orders.filter((item) => item.id !== product.id));
    } else {
      return;
    }
  };
  function handleAddProduct(product: IProductData) {
    const productExist = orders.find((item) => item?.id === product?.id);

    if (productExist) {
      setOrders(
        orders.map((item) =>
          item.id === product.id
            ? {
                ...productExist,
                quantity: productExist.quantity + 1,
              }
            : item
        )
      );
    } else {
      setOrders([...orders, { ...product, quantity: 1 }]);
    }
  }

  return (
    <div>
      <Header
        setSearchValue={setSearchValue}
        handleLoginWindow={handleLoginWindow}
        orders={orders}
      />
      <orderContext.Provider value={orders}>
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/"
            element={
              <HomePage
                searchResults={searchResults}
                handleAddProduct={handleAddProduct}
              />
            }
          />

          <Route
            path="/product/:id"
            element={<Product handleAddProduct={handleAddProduct} />}
          />

          <Route
            path="/cart"
            element={
              <Orders
                handleAddProduct={handleAddProduct}
                handleRemoveAll={handleRemoveAll}
                handleRemoveProduct={handleRemoveProduct}
                handleDeleteOrder={handleDeleteOrder}
              />
            }
          />
        </Routes>
      </orderContext.Provider>

      {loginWindow && (
        <div className="fixed h-[100vh] w-full top-0 overflow-hidden">
          <Login
            handleRegWindow={handleRegWindow}
            handleLoginWindow={handleLoginWindow}
          />
        </div>
      )}

      {regWindow && (
        <div className="fixed h-[100vh] w-full top-0 overflow-hidden">
          <Register
            handleRegWindow={handleRegWindow}
            handleLoginWindow={handleLoginWindow}
            regWindow={regWindow}
          />
        </div>
      )}
    </div>
  );
}

export default App;
