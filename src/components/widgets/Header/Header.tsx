import React, { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import "./Header.scss";
import ModalComponent from "../ModalComponent/ModalComponent";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="header">
      <button onClick={openModal}>Авторизация</button>

      <ModalComponent isOpen={isModalOpen} onClose={closeModal}>
        <h2>Вход</h2>
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <LoginForm onCloseModal={closeModal} />
      </ModalComponent>
    </div>
  );
};

export default Header;
