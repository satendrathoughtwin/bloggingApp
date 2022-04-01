
import React, { useEffect, useState } from "react";
import BlogProfile from "../../components/blogProfile/BlogProfile";
import { deletePostById, getAllPosts } from "../../services/api";
import swal from "sweetalert";

import "./UserProfile.css";
const UserProfilePage = () => {
  const [allPostData, setALlPostData] = useState([]);
  const allPost = async () => {
    const result = await getAllPosts();
    if (result) {
      setALlPostData(result);
    }
  };
  useEffect(() => {
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
      }).then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    }
  };

  return (
    <div className="userProfilePage">
      <h1>userProfile</h1>
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
