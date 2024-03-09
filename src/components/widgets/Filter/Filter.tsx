import "./Filter.scss";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Select from "react-select";

import PostsStore from "../../../stores/PostsStore";
import { SelectType } from "../../../types/PostsTypes";

const Filter: React.FC = observer(() => {
  useEffect(() => {
    (async () => {
      await PostsStore.getAllItemsTax("tip");
      await PostsStore.getAllItemsTax("tags");
    })();
  }, []);

  const addTag = (tags: Array<SelectType>) => {
    PostsStore.setElementFilterValues("tag_tid", tags);
  };

  const addType = (types: Array<SelectType>) => {
    PostsStore.setElementFilterValues("tip_tid", types);
  };

  const applyFilter = (e: any) => {
    e.preventDefault();

    PostsStore.getPostsByFilter();
  };

  return (
    <div className="filter">
      <h3>Фильтр</h3>
      <form className="filter__form" onSubmit={applyFilter}>
        <Select
          isMulti
          options={PostsStore.tags}
          className="filter__form-select"
          placeholder="Теги"
          onChange={addTag}
          // value={postID && PostsStore.selectedTags.length > 0 && PostsStore.selectedTags}
        />
        <Select
          isMulti
          options={PostsStore.types}
          className="filter__form-select"
          placeholder="Типы"
          onChange={addType}
          // value={postID && PostsStore.selectedTags.length > 0 && PostsStore.selectedTags}
        />

        <button className="btn" type="submit">
          Применить
        </button>
      </form>
    </div>
  );
});

export default Filter;
