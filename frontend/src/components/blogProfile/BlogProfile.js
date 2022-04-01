import React from "react";
import "./BlogProfile.css";

import {useNavigate } from "react-router-dom";

const BlogProfile = ({ BlogData, UserId, deleteBlog }) => {
  const navigate = useNavigate();
  return (
    <div className="BlogProfile">
      <div className="blogProfileHeaderDiv">
        <h1>Creator Name</h1>
        <h3>{BlogData.date_Time}</h3>
      </div>

      <div className="blogProfile_Title_Button_Div">
        <div>
          <h3>Title : {BlogData.title}</h3>
        </div>

        <div className="blogProfile_Button_Div">
          {UserId ? (
            <>
              <button onClick={() => navigate(`/blog/${BlogData._id}`)}>
                Edit
              </button>
              <button
                onClick={() => {
                  deleteBlog(BlogData._id);
                }}
              >
                Delete
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
    </div>
  );
};

export default BlogProfile;
