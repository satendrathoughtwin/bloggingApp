import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import BlogPage from "./pages/Blog/BlogPage";
import UserProfilePage from "./pages/userProfile/UserProfilePage";
import HomePage from "./pages/Home/HomePage";
import IndivisualBlogPage from "./pages/indivisulaBlog/IndivisualBlogPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import UpdateUser from "./pages/updateUser/UpdateUser";
import ForgetPasswordPage from "./pages/auth/ForgetPassword";
import { localStorageData } from "./services/localStorage";
import { useDispatch } from "react-redux";
import { setLocalStorageAction } from "./redux/action/localStorageAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();
  useEffect(async () => {
    const local_Storage_Data = await localStorageData();
    dispatch(setLocalStorageAction(local_Storage_Data));
  }, []);
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/indivisualblog/:blogId"
            element={<IndivisualBlogPage />}
          />
          <Route path="/userProfile" element={<UserProfilePage />} />
          <Route
            path="/otherUserProfile/:otherProfileId"
            element={<UserProfilePage />}
          />
          <Route path="/blog" element={<BlogPage />} />

          <Route path="/blog/:blogId" element={<BlogPage />} />
          <Route path="/userUpdate/:userId" element={<UpdateUser />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
