import React from "react";
import { Routes, Route } from "react-router-dom";

import Main from "../pages/Main";
import EditPost from "../pages/EditPost/EditPost";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/EditPost" element={<EditPost />} />
    </Routes>
  );
};

export default AppRouter;
