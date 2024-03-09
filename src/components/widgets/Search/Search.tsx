import "./Search.scss";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import PostsStore from "../../../stores/PostsStore";

const Search: React.FC = observer(() => {
  const chageHandler = (e: any) => {
    PostsStore.setSearchQuery(e.target.value);
  };

  const search = (e: any) => {
    e.preventDefault();

    if (PostsStore.searchQuery.length > 0) {
      PostsStore.searchPosts();
    } else {
      PostsStore.getAllPosts();
    }
  };

  return (
    <div className="search">
      <h3>Поиск</h3>
      <form className="search__form" onSubmit={search}>
        <input type="text" onChange={chageHandler} value={PostsStore.searchQuery} className="input search__form-input" />
        <button className="btn search__form-btn">Найти</button>
      </form>
    </div>
  );
});

export default Search;
