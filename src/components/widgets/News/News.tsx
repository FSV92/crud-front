import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import "./News.scss";
import NewsItem from "../NewsItem/NewsItem";
import PostsStore from "../../../stores/PostsStore";

const News: React.FC = observer(() => {
  useEffect(() => {
    (async () => {
      await PostsStore.getAllPosts();
    })();
  }, []);

  return (
    <div className="news">
      <div className="news__container">
        <Link to="/EditPost" className="btn news__add-post">
          Добавить пост
        </Link>
        <div className="news__items">{PostsStore?.posts?.length > 0 && PostsStore.posts.map((post) => <NewsItem post={post} key={post.id} />)}</div>
      </div>
    </div>
  );
});

export default News;
