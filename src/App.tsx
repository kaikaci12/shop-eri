import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { createContext, useEffect } from "react";
import { useState } from "react";
import data from "./data.json";
import { IProductData } from "./types.d";
import { useContext } from "react";

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
    if (!regWindow) {
      setRegWindow(true);
    } else {
      setRegWindow(false);
    }
  }
  function handleLoginWindow() {
    if (!loginWindow) {
      setLoginWindow(true);
    } else {
      setLoginWindow(false);
    }
  }
  return (
    <div>
      <Header
        handleRegWindow={handleRegWindow}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />
      {regWindow && (
        <Register
          handleRegWindow={handleRegWindow}
          regWindow={regWindow}
          setLoginWindow={setLoginWindow}
          loginWindow={loginWindow}
        />
      )}
      {loginWindow && (
        <Login setLoginWindow={setLoginWindow} loginWindow={loginWindow} />
      )}
      <Routes></Routes>
    </div>
  );
}

export default App;
