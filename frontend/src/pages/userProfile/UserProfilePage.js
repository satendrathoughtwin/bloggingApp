import React, { useEffect, useState } from "react";
import BlogProfile from "../../components/blogProfile/BlogProfile";
import {
  deletePostById,
  getAllpostsOfIndivisualUser,
  getUserByEmail,
  getUserById,
} from "../../services/api";
import swal from "sweetalert";

import { AiFillEdit } from "react-icons/ai";
import {AlWorkplaceShareButtonl}  from "react-share"
import "./UserProfile.css";
import { NavLink,useParams } from "react-router-dom";
const UserProfilePage = () => {
  const [allPostData, setALlPostData] = useState([]);
  const [userData, setUserData] = useState([]);
  const { otherProfileId } = useParams();
  const [isSameUser, setIsSameUser] = useState(true);
  const [isFollow, setIsFollow] = useState(false);

  const allPost = async () => {
    const locatStorageData = await localStorage.getItem("loginUserData");
    const localStorageObjectData = await JSON.parse(locatStorageData);

    otherProfileId === undefined ||
    otherProfileId === localStorageObjectData.email
      ? setIsSameUser(true)
      : setIsSameUser(false);
    let result;
    if (otherProfileId) {
      result = await getAllpostsOfIndivisualUser(otherProfileId);
    } else
      result = await getAllpostsOfIndivisualUser(localStorageObjectData.email);

    if (result) {
      setALlPostData(result);
    }
  };

  const getUserProfile = async () => {
    const locatStorageData = await localStorage.getItem("loginUserData");
    const localStorageObjectData = await JSON.parse(locatStorageData);
    let result;
    if (otherProfileId) {
      result = await getUserByEmail(otherProfileId);
    } else result = await getUserById(localStorageObjectData._id);
    if (result) {
      setUserData(result[0]);
    }
  };

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

  useEffect(() => {
    getUserProfile();
    allPost();
  }, [otherProfileId]);
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
          {isSameUser ? (
            <NavLink to={`/userUpdate/${userData._id}`}>
              <AiFillEdit />
            </NavLink>
          ) : (
            ""
          )}
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
          <div>
            <button className="followers">Followers 10000000</button>
            {isFollow ? (
              <button className="unfollow">UnFollow</button>
            ) : (
              <button className="follow">Follow</button>
            )}
          </div>
        </aside>
      </section>
      {allPostData.map((data, ind) => {
        return (
          <BlogProfile
            BlogData={data}
            UserId={isSameUser}
            key={ind}
            deleteBlog={deleteBlog}
          />
        );
      })}
    </div>
  );
};

export default UserProfilePage;
