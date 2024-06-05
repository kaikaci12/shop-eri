import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Register from "./pages/Register";
import Orders from "./components/Orders";
import Login from "./pages/Login";
import { createContext, useEffect, useState } from "react";
import Product from "./pages/Product";
import data from "./data.json";
import { IProductData, IOrders } from "./types.d";

export const orderContext = createContext([]);

function App() {
  const [regWindow, setRegWindow] = useState<boolean>(false);
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
  }
  function handleLoginWindow() {
    setLoginWindow((prev) => !prev);
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
      // Handle the case where the product doesn't exist (optional)
      console.warn("Product not found in orders");
    }
  }

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

  console.log(orders);
  return (
    <div>
      <Header
        setSearchValue={setSearchValue}
        handleLoginWindow={handleLoginWindow}
        orders={orders}
      />

      {regWindow && (
        <Register
          handleRegWindow={handleRegWindow}
          handleLoginWindow={handleLoginWindow}
        />
      )}

      {loginWindow && (
        <Login
          handleRegWindow={handleLoginWindow}
          handleLoginWindow={handleLoginWindow}
        />
      )}

      <Routes>
        <Route path="/" element={<HomePage searchResults={searchResults} />} />
        <Route
          path="/product/:id"
          element={<Product handleAddProduct={handleAddProduct} />}
        />

        <Route
          path="/orders"
          element={
            <Orders
              orders={orders}
              handleAddProduct={handleAddProduct}
              handleRemoveAll={handleRemoveAll}
              handleRemoveProduct={handleRemoveProduct}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
