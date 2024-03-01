import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
// import LoginForm from "../LoginForm/LoginForm";
import "./EditPost.scss";
// import {
//   // makeAutoObservable,
//   // observable,
//   // action,
//   runInAction,
//   // computed
// } from "mobx";
import Select from "react-select";

import PostsStore from "../../../stores/PostsStore";
import { SelectType } from "../../../types/PostsTypes";
import ModalComponent from "../../widgets/ModalComponent/ModalComponent";
import { Link } from "react-router-dom";

type PropsType = {};

const EditPost: React.FC<PropsType> = observer((props) => {
  const inputContainerRef = useRef(null); // ссылка на контейнер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    (async () => {
      await PostsStore.getAllItemsTax("tip");
      await PostsStore.getAllItemsTax("tags");

      // console.log("PostsStore.tags", PostsStore.tags[0].name[0].value);
    })();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    // console.log(e.target.name);
    const converValue = value.replace(/(?:\r\n|\r|\n)/g, "<br />");
    PostsStore.setInputPostValue(name, converValue);
  };

  const selectDate = (e: any) => {
    const date = e.target.value;

    const newDate = new Date(date);
    const formattedDate = newDate.toISOString().replace(".000Z", "+") + newDate.toLocaleTimeString();

    console.log(PostsStore.setDateValue(formattedDate));
  };

  const addInput = (e: any) => {
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

  const create = async (e: any) => {
    e.preventDefault();

    await PostsStore.createPost(openModal);
  };

  return (
    <>
      <div className="edit-post">
        <form className="edit-post__form" onSubmit={create}>
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
            {PostsStore.tags && (
              <Select isMulti options={PostsStore.tags} className="edit-post__select" placeholder="Выберите теги" onChange={addTag} />
            )}

            {PostsStore.types && <Select options={PostsStore.types} className="edit-post__select" placeholder="Выберите тип" onChange={addType} />}
          </div>

          <div className="edit-post__form-row">
            <span>Ключевые даты</span>
            <div className="edit-post__dates-inputs" ref={inputContainerRef}>
              <input type="date" onChange={selectDate} />
            </div>
            <button onClick={addInput}>добавить дату</button>
          </div>

          <button className="btn edit-post__form-btn">Добавить пост</button>
        </form>
      </div>

      <ModalComponent isOpen={isModalOpen} onClose={closeModal}>
        <h3 className="edit-post__modal-title">Новость добавлена!</h3>
        <Link to="/" className="btn edit-post__modal-link">
          На главную
        </Link>
      </ModalComponent>
    </>
  );
});

export default EditPost;
