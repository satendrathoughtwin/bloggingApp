import React, { useEffect, useState } from "react";
import BlogProfile from "../../components/blogProfile/BlogProfile";
import {
  deletePostById,
  getAllpostsOfIndivisualUser,
  getUserByEmail,
  getUserById,
  follow,
  unFollow,
  alreadyFollowing,
} from "../../services/api";
import swal from "sweetalert";

import { AiFillEdit } from "react-icons/ai";
import "./UserProfile.css";
import { NavLink, useParams } from "react-router-dom";
import { localStorageData } from "../../services/localStorage";
const UserProfilePage = () => {
  const [allPostData, setALlPostData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [followingUserId, setFollowingUserId] = useState("");
  const [followingProfileId, setFollowingProfileId] = useState("");
  const { otherProfileId } = useParams();
  const [isSameUser, setIsSameUser] = useState(true);
  const [isFollow, setIsFollow] = useState(false);
  const [isUserEmail, setIsUserEmail] = useState(false);
  const [localStoreage, setLocalStoreage] = useState("");

  const allPost = async () => {
    const local_Storage_Data = await localStorageData();
    local_Storage_Data
      ? setLocalStoreage(local_Storage_Data)
      : setLocalStoreage("");
    otherProfileId === undefined || otherProfileId === local_Storage_Data?.email
      ? setIsSameUser(true)
      : setIsSameUser(false);
    let result;
    if (otherProfileId) {
      result = await getAllpostsOfIndivisualUser(otherProfileId);
    } else
      result = await getAllpostsOfIndivisualUser(local_Storage_Data?.email);

    if (result) {
      setALlPostData(result);
    }
  };

  const getUserProfile = async () => {
    const local_Storage_Data = await localStorageData();
    if (local_Storage_Data) setIsUserEmail(local_Storage_Data?.email);
    let result;
    if (otherProfileId) {
      result = await getUserByEmail(otherProfileId);
      if (result) {
        setFollowingUserId(result[0].email);
        setFollowingProfileId(result[0]._id);
        await isFollowing(
          local_Storage_Data._id,
          local_Storage_Data.email,
          result[0]._id,
          otherProfileId
        );
      }
    } else result = await getUserById(local_Storage_Data?._id);
    if (result) {
      setUserData(result);
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

  const followOtherUser = async (
    myProfileId,
    myProfileEmail,
    otherProfileId,
    otherProfileEmail
  ) => {
    const body = {
      myProfileId,
      myProfileEmail,
      otherProfileId,
      otherProfileEmail,
    };
    const result = await follow(body);
    if (result.isProceed) {
      setIsFollow(true);
    }
  };

  const unfollowOtherUser = async (
    myProfileId,
    myProfileEmail,
    otherProfileId,
    otherProfileEmail
  ) => {
    const body = {
      myProfileId,
      myProfileEmail,
      otherProfileId,
      otherProfileEmail,
    };
    const result = await unFollow(body);
    if (result.isProceed) {
      setIsFollow(false);
    }
  };

  const isFollowing = async (
    myProfileId,
    myProfileEmail,
    otherProfileId,
    otherProfileEmail
  ) => {
    const body = {
      myProfileId,
      myProfileEmail,
      otherProfileId,
      otherProfileEmail,
    };
    const result = await alreadyFollowing(body);
    if (result.isProceed) {
      setIsFollow(true);
    }
  };

  useEffect(() => {
    getUserProfile();
    allPost();
  }, [otherProfileId]);

  useEffect(() => {
    getUserProfile();
  }, [isFollow]);
  return (
    <div className="userProfilePage">
      {userData.map((data, ind) => {
        return (
          <section key={ind} className="userProfile_Section">
            <figure className="userProfile_Section_figure">
              <img
                src={
                  data.imgUrl ||
                  "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                }
                alt="pic"
              />
              {isSameUser ? (
                <NavLink to={`/userUpdate/${data._id}`}>
                  <AiFillEdit />
                </NavLink>
              ) : (
                ""
              )}
            </figure>
            <aside className="userProfile_Section_Aside">
              <div className="userProfile_Section_Content">
                <p>Name</p>
                <p>: {data.name}</p>
              </div>
              <div className="userProfile_Section_Content">
                <p>Email</p>
                <p className="userProfile_Section_Email">: {data.email}</p>
              </div>
              <div className="userProfile_Section_Content">
                <p>Profession</p>
                <p>: {data.profession || "Blogger"}</p>
              </div>
              <div className="userProfile_section_follow_ubfolow_div">
                <button className="followers">
                  Followers {data.followers.length}
                </button>
                <button className="followers">
                  Following {data.following.length}
                </button>
                {isUserEmail !== otherProfileId && localStoreage && otherProfileId ? (
                  isFollow ? (
                    <button
                      className="unfollow"
                      onClick={() =>
                        unfollowOtherUser(
                          localStoreage._id,
                          localStoreage.email,
                          followingProfileId,
                          followingUserId
                        )
                      }
                    >
                      UnFollow
                    </button>
                  ) : (
                    <button
                      className="follow"
                      onClick={() =>
                        followOtherUser(
                          localStoreage._id,
                          localStoreage.email,
                          followingProfileId,
                          followingUserId
                        )
                      }
                    >
                      Follow
                    </button>
                  )
                ) : (
                  ""
                )}
              </div>
            </aside>
          </section>
        );
      })}

      {allPostData &&
        allPostData.map((data, ind) => {
          return (
            <BlogProfile
              BlogData={data}
              UserId={isSameUser}
              deleteBlog={deleteBlog}
            />
          );
        })}
    </div>
  );
};

export default UserProfilePage;
