import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { createContext, useEffect, useState } from "react";
import Product from "./pages/Product";
import data from "./data.json";
import { IProductData, IOrders } from "./types.d";
import { boolean } from "yup";

export const productContext = createContext(data);

function App() {
  const [regWindow, setRegWindow] = useState<boolean>(false);
  const [loginWindow, setLoginWindow] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IProductData[]>([]);
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

  // function handleRemoveProduct(product: IOrders) {
  //   const productExist = orders.find((item) => item.id === product.id);
  //   if (productExist?.quantity === 1) {
  //     setOrders(orders.filter((item) => item.id !== product.id));
  //   } else {
  //     setOrders(
  //       orders.map((item) =>
  //         item?.id === product.id
  //           ? { ...productExist, quantity: productExist.quantity - 1 }
  //           : item
  //       )
  //     );
  //   }
  // }
  function handleAddProduct(product: IOrders[]) {
    const productExist = orders.find((item) => item.id === product.id);

    if (productExist) {
      setOrders(
        orders.map((item) =>
          item.id == product.id
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
        handleRegWindow={handleLoginWindow}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        handleLoginWindow={handleLoginWindow}
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
      <productContext.Provider value={searchResults}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </productContext.Provider>
    </div>
  );
}

export default App;
