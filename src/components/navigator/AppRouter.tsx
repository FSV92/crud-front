import React from "react";
import { Routes, Route } from "react-router-dom";

import Main from "../pages/Main";
import NewsDetail from "../pages/NewsDetail/NewsDetail";
import EditPost from "../pages/EditPost/EditPost";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/NewsDetail" element={<NewsDetail />} />
      <Route path="/EditPost" element={<EditPost />} />
    </Routes>
  );
};

export default AppRouter;
