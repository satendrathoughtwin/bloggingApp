import React, { useEffect, useState } from "react";
import "./BlogProfile.css";
import { FcLike } from "react-icons/fc";
import { AiOutlineLike, AiFillEdit, AiFillLike } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { GoCommentDiscussion } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import MyModle from "../Modal/MyModle";
import { addComment, alreadyLiked, disLike, like } from "../../services/api";
import SocialMedia from "../socialMedia.js/SocialMedia";
import { localStorageData } from "../../services/localStorage";
import AddComment from "../../pages/comment/AddComment";
const BlogProfile = ({ BlogData, UserId, deleteBlog }) => {
  const navigate = useNavigate();
  const [isLike, setIsLike] = useState(false);

  const likeBlog = async (myProfileId, myProfileEmail) => {
    const local_Storage_Data = await localStorageData();
    try {
      const body = {
        myProfileId,
        myProfileEmail,
        likerProfileEmail: local_Storage_Data.email,
      };
      const result = await like(body);
      if (result.isProceed) {
        setIsLike(true);
      }
    } catch (err) {}
  };

  const alreadyBlogLiked = async () => {
    const local_Storage_Data = await localStorageData();
    try {
      const body = {
        myProfileId: BlogData._id,
        likerProfileEmail: local_Storage_Data.email,
      };
      const result = await alreadyLiked(body);
      if (result.isProceed) {
        setIsLike(true);
      }
    } catch (err) {}
  };
  const disLikeBlog = async (myProfileId, myProfileEmail) => {
    const local_Storage_Data = await localStorageData();
    try {
      const body = {
        myProfileId,
        myProfileEmail,
        likerProfileEmail: local_Storage_Data.email,
      };
      const result = await disLike(body);
      if (result.isProceed) {
        setIsLike(false);
      }
    } catch (err) {}
  };

  const addCommentOnPost = async (myProfileId, myProfileEmail) => {
    const local_Storage_Data = await localStorageData();
    try {
      const body = {
        myProfileId,
        myProfileEmail,
        likerProfileEmail: local_Storage_Data.email,
      };
      const result = await addComment(body);
      if (result.isProceed) {
        setIsLike(true);
      }
    } catch (err) {}
  };

  useEffect(() => {
    alreadyBlogLiked();
  }, [isLike]);

  useEffect(() => {
    console.log("BlogDATa", BlogData);
    alreadyBlogLiked();
  }, [BlogData]);
  return (
    <div className="BlogProfile">
      <div className="blogProfileHeaderDiv">
        <NavLink to={`/otherUserProfile/${BlogData.userEmail}`}>
          <h3>{BlogData.userEmail}</h3>
        </NavLink>

        <h5>{BlogData.date_Time}</h5>
      </div>

      <div className="blogProfile_Title_Button_Div">
        <div>
          <h3>Title : {BlogData.title}</h3>
        </div>

        <div className="blogProfile_Button_Div">
          {UserId ? (
            <>
              <button onClick={() => navigate(`/blog/${BlogData._id}`)}>
                <AiFillEdit />
              </button>
              <button
                onClick={() => {
                  deleteBlog(BlogData._id);
                }}
              >
                <MdDelete />
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="BlogProfileImgDiv">
        <img src={BlogData.imgUrl} />
      </div>

      <div className="BlogProfileDescription">
        <span dangerouslySetInnerHTML={{ __html: BlogData.description }} />
      </div>
      <footer className="BlogProfileFooter">
        <div className="BlogProfile_Footer__Span">
          <span>
            <FcLike />
          </span>
          <span>
            Sapna@82, sharshti632, and you, {BlogData?.like?.length} others
          </span>
          {/* <span>
            {BlogData?.like[BlogData?.like?.length - 1]},
            {BlogData?.like[BlogData?.like?.length - 2]}, and you,
            {BlogData?.like?.length} others
          </span> */}
        </div>
        <NavLink to="/">{BlogData?.comment?.length} comments</NavLink>
      </footer>
      <footer className="BlogProfileFooterButton">
        {isLike ? (
          <button
            onClick={() => disLikeBlog(BlogData._id, BlogData.userEmail)}
            className="likeButton"
          >
            <AiFillLike />
          </button>
        ) : (
          <button onClick={() => likeBlog(BlogData._id, BlogData.userEmail)}>
            <AiOutlineLike />
          </button>
        )}
        <button>
          {/* <GoCommentDiscussion /> */}
          <MyModle
            MainContent={AddComment}
            ButtonIcon={<GoCommentDiscussion />}
          />
        </button>
        <button>
          <MyModle MainContent={SocialMedia} ButtonIcon={<FiShare2 />} />
        </button>
      </footer>
    </div>
  );
};

export default BlogProfile;
