import React from "react";
import { Routes, Route } from "react-router-dom";

import Main from "../pages/Main";
import NewsDetail from "../pages/NewsDetail";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/NewsDetail" element={<NewsDetail />} />
    </Routes>
  );
};

export default AppRouter;