import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <h2>Вход</h2>

      <LoginForm />
    </div>
  );
};

export default Header;
