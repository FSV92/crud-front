import "normalize.css";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/navigator/AppRouter";
import React, { useEffect } from "react";

import Header from "./components/widgets/Header/Header";
import LoginStore from "./stores/LoginStore";

function App() {
  useEffect(() => {
    LoginStore.checkSetAuth();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
