import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import "./NewsItem.scss";
import PostsStore, { PostModelType } from "../../../stores/PostsStore";
import Tag from "../../elements/Tag/Tag";
import Type from "../../elements/Type/Type";

type PropsType = {
  post: PostModelType;
};

const NewsItem: React.FC<PropsType> = observer((props) => {
  const { post } = props;

  // console.log(post);

  const convertDate = (date: string) => {
    const dateObject = new Date(date);

    return dateObject.toLocaleString().split(",")[0];
  };

  const deletePost = () => {
    console.log(post.id);

    PostsStore.deletePost(post.id);
  };

  const editPost = () => {
    console.log(post.id);
  };

  return (
    <div className="news__item">
      <div className="news__item-head">
        <Link to="/NewsDetail" className="news__item-title">
          {post.title}
        </Link>

        {post.type && <Type type={post.type} />}
      </div>
      <img className="news__item-img" src={post.image} />
      <div className="news__item-body" dangerouslySetInnerHTML={{ __html: post.body }} />
      <div className="news__item-dates">
        Ключевые даты:
        {post.dates.map((date, index) => {
          return convertDate(date.value) + `${index !== post.dates.length - 1 ? ", " : ""}`;
        })}
      </div>

      <div className="news__item-footer">
        <div className="news__item-tags">
          {post.tags.map((tag) => (
            <Tag key={tag.target_id} tid={tag.target_id} />
          ))}
        </div>

        <div className="news__item-btns">
          <button className="news__item-btn news__item-btn--del" onClick={deletePost}>
            Удалить
          </button>
          <button className="news__item-btn news__item-btn--edit" onClick={editPost}>
            Изменить
          </button>
        </div>
      </div>
    </div>
  );
});

export default NewsItem;
