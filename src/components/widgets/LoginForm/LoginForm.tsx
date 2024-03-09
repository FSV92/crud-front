import "./LoginForm.scss";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import LoginStore from "../../../stores/LoginStore";

type PropsType = {
  onCloseModal(): void;
};

const LoginForm: React.FC<PropsType> = observer((props) => {
  const { onCloseModal } = props;
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const login = async (e: any) => {
    e.preventDefault();

    if (name.length > 2 && pass.length > 2) {
      const values = { name, pass };
      await LoginStore.login(values);

      if (LoginStore.isAuth) {
        setName("");
        setPass("");
        onCloseModal();
      }
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={login}>
        <input
          type="text"
          name="name"
          className="input login-form__input login-form__input--name"
          placeholder="Логин"
          value={name}
          onChange={(e) => setName(e.target.value)}
          pattern="^[a-zA-Z]+$" // любые латинские символы
        />

        <input
          type="password"
          className="input login-form__input login-form__input--pass"
          placeholder="Пароль"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button className="btn" type="submit">
          Войти
        </button>
      </form>
    </>
  );
});

export default LoginForm;
