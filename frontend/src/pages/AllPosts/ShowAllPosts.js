import React, { useEffect, useState } from "react";
import ShowIndivisulaPost from "../../components/Post/ShowIndivisualPost";
import { getAllPosts } from "../../services/api";

const ShowAllPosts = () => {
  const [allPost, setAllPost] = useState([]);
  const getPost = async () => {
    const result = await getAllPosts();
    if (result) {
      setAllPost(result);
    }
  };
  useEffect(() => {
    getPost();
  }, []);
  return (
    <div>
      {allPost.map((data, ind) => {
        return <ShowIndivisulaPost data={data} key={ind} />;
      })}
    </div>
  );
};

export default ShowAllPosts;
