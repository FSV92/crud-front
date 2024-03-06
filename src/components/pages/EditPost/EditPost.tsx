import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
// import LoginForm from "../LoginForm/LoginForm";
import "./EditPost.scss";
import Select from "react-select";

import PostsStore from "../../../stores/PostsStore";
import { SelectType } from "../../../types/PostsTypes";
import ModalComponent from "../../widgets/ModalComponent/ModalComponent";
import { Link, useLocation } from "react-router-dom";

type PropsType = {};

const EditPost: React.FC<PropsType> = observer((props) => {
  const data = useLocation();
  const postID = data?.state?.postID;
  const inputContainerRef = useRef(null); // ссылка на контейнер
  const inputRef = useRef(null); // ссылка на контейнер
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      // await PostsStore.getAllItemsTax("tip");
      // await PostsStore.getAllItemsTax("tags");

      if (postID) {
        await PostsStore.getPostByID(data.state.postID);
      }
    })();

    return () => {
      PostsStore.resetInputPostValues();
    };
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    PostsStore.setInputPostValue(name, value);
  };

  const selectDate = (e: any) => {
    const date = e.target.value;

    PostsStore.setDateValue(date);

    e.target.remove();
    console.log();

    // inputContainerRef.current.remove();
  };

  const addInputDate = (e: any) => {
    e.preventDefault();

    const newInput = document.createElement("input");
    newInput.type = "date";
    newInput.addEventListener("change", selectDate);

    inputContainerRef.current.appendChild(newInput);
  };

  const addTag = (tags: Array<SelectType>) => {
    PostsStore.setTagsValues(tags);
  };

  const addType = (type: SelectType) => {
    PostsStore.setTypeValue(type);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    if (postID) {
      await PostsStore.updatePost(data.state.postID, openModal);
    } else {
      await PostsStore.createPost(openModal);
    }
  };
  // console.log("PostsStore.selectedTags", PostsStore.selectedTags);

  return (
    <>
      <div className="edit-post">
        <form className="edit-post__form" onSubmit={submitHandler}>
          <input
            className="input"
            type="text"
            placeholder="Заголовок"
            name="title"
            value={PostsStore.inputPostValues.title.value}
            onChange={handleInputChange}
            required
          />

          <textarea
            className="textarea"
            name="body"
            id="body"
            placeholder="Описание"
            value={PostsStore.inputPostValues.body.value}
            onChange={handleInputChange}
            required></textarea>
          <div className="edit-post__form-row">
            <Select
              isMulti
              options={PostsStore.tags}
              className="edit-post__select"
              placeholder="Выберите теги"
              onChange={addTag}
              value={postID && PostsStore.selectedTags.length > 0 && PostsStore.selectedTags}
            />

            {PostsStore.types && (
              <Select
                options={PostsStore.types}
                className="edit-post__select"
                placeholder="Выберите тип"
                onChange={addType}
                value={PostsStore.selectedType}
              />
            )}
          </div>
          <div className="edit-post__form-row">
            <span>Ключевые даты</span>
            <div className="edit-post__dates-inputs" ref={inputContainerRef}>
              {PostsStore.inputPostValues.field_klyuchevaya_data &&
                PostsStore.inputPostValues.field_klyuchevaya_data.map((date) => (
                  <input ref={inputRef} key={date.value} type="date" onChange={selectDate} value={date.value} />
                ))}
              {/* <input type="date" onChange={selectDate} /> */}
            </div>
            <button onClick={addInputDate}>добавить дату</button>
          </div>

          <button className="btn edit-post__form-btn">{postID ? "Обновить" : "Добавить"} пост</button>
        </form>
      </div>

      <ModalComponent isOpen={isModalOpen} onClose={closeModal}>
        <h3 className="edit-post__modal-title">Новость {postID ? "изменена" : "добавлена"}!</h3>
        <Link to="/" className="btn edit-post__modal-link">
          На главную
        </Link>
      </ModalComponent>
    </>
  );
});

// const EditPost = React.memo(EditPost);
export default EditPost;
