import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import BlogPage from "./pages/Blog/BlogPage";
import UserProfilePage from "./pages/userProfile/UserProfilePage";
import HomePage from "./pages/Home/HomePage";
import IndivisualBlogPage from "./pages/indivisulaBlog/IndivisualBlogPage";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:blogId" element={<BlogPage />} />
          <Route path="/indivisualblog/:blogId" element={<IndivisualBlogPage />} />
          <Route path="/userProfile" element={<UserProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;