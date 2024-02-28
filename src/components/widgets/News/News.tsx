import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import "./News.scss";
import NewsItem from "../NewsItem/NewsItem";
import PostsStore from "../../../stores/PostsStore";

const News: React.FC = observer(() => {
  useEffect(() => {
    (async () => {
      await PostsStore.getAllPosts();
    })();
  }, []);

  return <div className="news">{PostsStore?.posts?.length > 0 && PostsStore.posts.map((post) => <NewsItem post={post} key={post.id} />)}</div>;
});

export default News;
