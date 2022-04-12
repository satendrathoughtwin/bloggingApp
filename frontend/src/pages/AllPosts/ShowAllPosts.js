import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShowIndivisulaPost from "../../components/Post/ShowIndivisualPost";
import { getAllPosts } from "../../services/api";
import { search_filter_pagination } from "../../services/api";

const ShowAllPosts = () => {
  const [allPost, setAllPost] = useState([]);
  const searchData = useSelector((state) => state.searchBlogReducer);
  const getPost = async () => {
    const result = await getAllPosts();
    if (result) {
      setAllPost(result);
    }
  };

  const searchBlog = async (searchData) => {
    const body = {
      findBy: "title",
      findValue: searchData,
      sortBy: "createdAt",
      sortedOrder: -1,
      page: 1,
      size: 10,
    };
    try {
      const result = await search_filter_pagination(body);
      if (result) {
        // setAllPost(result)
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    searchBlog(searchData);
  }, [searchData]);
  return (
    <div>
      {allPost.map((data, index) => {
        return (
          <div key={index}>
            <ShowIndivisulaPost data={data} />
          </div>
        );
      })}
    </div>
  );
};

export default ShowAllPosts;
