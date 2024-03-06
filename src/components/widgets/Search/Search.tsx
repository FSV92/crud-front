import "./Search.scss";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import LoginForm from "../LoginForm/LoginForm";
import ModalComponent from "../ModalComponent/ModalComponent";
import LoginStore from "../../../stores/LoginStore";

const Search: React.FC = observer(() => {
  return (
    <div className="search">
      <h3>Поиск</h3>
      <form className="search__form">
        <input type="text" className="input search__form-input" />
        <button className="btn search__form-btn">Найти</button>
      </form>
    </div>
  );
});

export default Search;
