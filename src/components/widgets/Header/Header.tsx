import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import LoginForm from "../LoginForm/LoginForm";
import "./Header.scss";
import ModalComponent from "../ModalComponent/ModalComponent";
import LoginStore from "../../../stores/LoginStore";

const Header: React.FC = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="header">
      <div className="header__container">
        {LoginStore.isAuth ? (
          <div className="header__auth">
            <span>{LoginStore.userData.current_user.name}</span>

            <button className="btn">Выйти</button>
          </div>
        ) : (
          <button className="btn" onClick={openModal}>
            Авторизация
          </button>
        )}
      </div>

      <ModalComponent isOpen={isModalOpen} onClose={closeModal}>
        <h2>Вход</h2>
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <LoginForm onCloseModal={closeModal} />
      </ModalComponent>
    </div>
  );
});

export default Header;
