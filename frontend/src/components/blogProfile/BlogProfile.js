import React from "react";
import "./BlogProfile.css";
import { FcLike } from "react-icons/fc";
import { AiOutlineLike, AiFillEdit } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import MyModle from "../Modal/MyModle";
import SocialMedia from "../socialMedia.js/SocialMedia";

const BlogProfile = ({ BlogData, UserId, deleteBlog }) => {
  const navigate = useNavigate();
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
                <MdDelete/>
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
          <span>Sapna@82, sharshti632, and you</span>
        </div>
        <NavLink to="/">63 comments</NavLink>
      </footer>
      <footer className="BlogProfileFooterButton">
        <button>
          <AiOutlineLike />
        </button>
        <button>
          <GoCommentDiscussion />
        </button>
        <button>
          <MyModle MainContent={SocialMedia}/>
        </button>

      </footer>
    </div>
  );
};

export default BlogProfile;
