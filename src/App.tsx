import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { createContext } from "react";
import { useState } from "react";

function App() {
  const [regWindow, setRegWindow] = useState<boolean>(false);
  function handleRegWindow(reg: boolean) {
    if (!regWindow) {
      setRegWindow(true);
    } else {
      setRegWindow(false);
    }
  }

  return (
    <div>
      <Header handleRegWindow={handleRegWindow} regWindow={regWindow} />
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
