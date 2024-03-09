import "./Header.scss";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import LoginForm from "../LoginForm/LoginForm";
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

  const logout = () => {
    LoginStore.logout();
  };

  return (
    <div className="header">
      <div className="header__container">
        {LoginStore.isAuth ? (
          <div className="header__auth">
            <span>{LoginStore.userData.current_user.name}</span>

            <button className="btn" onClick={logout}>
              Выйти
            </button>
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
