import React, { useEffect, useState } from "react";
import BlogProfile from "../../components/blogProfile/BlogProfile";
import {
  deletePostById,
  getAllpostsOfIndivisualUser,
  getUserById,
} from "../../services/api";
import swal from "sweetalert";

import "./UserProfile.css";
import { NavLink } from "react-router-dom";
const UserProfilePage = () => {
  const [allPostData, setALlPostData] = useState([]);
  const [userData, setUserData] = useState([]);

  const allPost = async () => {
    const locatStorageData = await localStorage.getItem("loginUserData");
    const localStorageObjectData = await JSON.parse(locatStorageData);
    const result = await getAllpostsOfIndivisualUser(
      localStorageObjectData.email
    );
    if (result) {
      setALlPostData(result);
    }
  };

  const getUserProfile = async () => {
    const locatStorageData = await localStorage.getItem("loginUserData");
    const localStorageObjectData = await JSON.parse(locatStorageData);
    const result = await getUserById(localStorageObjectData._id);
    if (result) {
      setUserData(result[0]);
    }
  };
  useEffect(() => {
    getUserProfile();
    allPost();
  }, []);

  const deleteBlog = async (postId) => {
    const result = await deletePostById(postId);
    if (result) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
          await allPost();
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    }
  };

  return (
    <div className="userProfilePage">
      <section className="userProfile_Section">
        <figure className="userProfile_Section_figure">
          <img
            src={
              userData.imgUrl ||
              "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
            }
            alt="pic"
          />
          <NavLink to={`/userUpdate/${userData._id}`}>Edit</NavLink>
        </figure>
        <aside className="userProfile_Section_Aside">
          <div className="userProfile_Section_Content">
            <p>Name</p>
            <p>: {userData.name}</p>
          </div>
          <div className="userProfile_Section_Content">
            <p>Email</p>
            <p>: {userData.email}</p>
          </div>
          <div className="userProfile_Section_Content">
            <p>Profession</p>
            <p>: {userData.profession || "Blogger"}</p>
          </div>
        </aside>
      </section>
      {allPostData.map((data, ind) => {
        return (
          <BlogProfile
            BlogData={data}
            UserId={1234}
            key={ind}
            deleteBlog={deleteBlog}
          />
        );
      })}
    </div>
  );
};

export default UserProfilePage;
