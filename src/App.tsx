import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { createContext, useEffect } from "react";
import { useState } from "react";
import data from "./data.json";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

function App() {
  const [regWindow, setRegWindow] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    const results = data.filter((value) =>
      value.name.toLowerCase().includes(searchValue)
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
  console.log(searchResults);
  return (
    <div>
      <Header
        handleRegWindow={handleRegWindow}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />
      {regWindow && (
        <Register handleRegWindow={handleRegWindow} regWindow={regWindow} />
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
