import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { createContext, useEffect, useState } from "react";
import Product from "./pages/Product";
import data from "./data.json";
import { IProductData } from "./types.d";
import { boolean } from "yup";

export const productContext = createContext(data);

function App() {
  const [regWindow, setRegWindow] = useState<boolean>(false);
  const [loginWindow, setLoginWindow] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IProductData[]>([]);

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
