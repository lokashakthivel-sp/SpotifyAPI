import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/protectedRoute";
import Login from "../pages/Login";
import Home from "../pages/Home";
import TopItems from "../pages/TopItems";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/top-items" element={<TopItems />} />
            {/* add more pages */}
          </Route>
        </Route>
        <Route path="*" element={<h2>404 Not found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
