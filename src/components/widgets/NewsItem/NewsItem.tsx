import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import "./NewsItem.scss";
import PostsStore from "../../../stores/PostsStore";
import { PostModelType } from "../../../types/PostsTypes";
import Tag from "../../elements/Tag/Tag";
import Type from "../../elements/Type/Type";
import LoginStore from "../../../stores/LoginStore";

type PropsType = {
  post: PostModelType;
};

const NewsItem: React.FC<PropsType> = observer((props) => {
  const { post } = props;

  const convertDate = (date: string) => {
    const dateObject = new Date(date);

    return dateObject.toLocaleString().split(",")[0];
  };

  const deletePost = () => {
    console.log(post.id);

    PostsStore.deletePost(post.id);
  };

  return (
    <div className="news__item">
      <div className="news__item-head">
        <h2 className="news__item-title">{post.title}</h2>

        {post.type && <Type type={post.type} />}
      </div>
      <div className="news__item-body" dangerouslySetInnerHTML={{ __html: post.body }} />
      {post.dates?.length > 0 && (
        <div className="news__item-dates">
          Ключевые даты:
          {post.dates.map((date, index) => {
            return convertDate(date.value) + `${index !== post.dates.length - 1 ? ", " : ""}`;
          })}
        </div>
      )}

      <div className="news__item-footer">
        <div className="news__item-tags">
          {post.tags.map((tag) => (
            <Tag key={tag.target_id} tid={tag.target_id} />
          ))}
        </div>

        {LoginStore.isAdmin && (
          <div className="news__item-btns">
            <button className="btn news__item-btn news__item-btn--del" onClick={deletePost}>
              Удалить
            </button>
            <Link to="/EditPost" className="btn news__item-btn news__item-btn--edit" state={{ postID: post.id }}>
              Изменить
            </Link>
          </div>
        )}
      </div>
    </div>
  );
});

export default NewsItem;
