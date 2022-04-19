import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShowIndivisulaPost from "../../components/Post/ShowIndivisualPost";
import { getAllPosts } from "../../services/api";
import { search_filter_pagination } from "../../services/api";
import "./ShowAllPosts.css"
const ShowAllPosts = () => {
  const [allPost, setAllPost] = useState([]);
  const [isAnyPost, setIsAnyPost] = useState(true);
  const searchData = useSelector((state) => state.searchBlogReducer);

  const getPost = async () => {
    const result = await getAllPosts();
    if (result.length > 0) {
      setAllPost(result);
    } else {
      setIsAnyPost(false);
    }
  };

  const searchBlog = async (searchData) => {
    if (searchData === "") {
      getPost();
      return;
    }
    const body = await {
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
        setAllPost(result);
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
    <>
      {isAnyPost ? (
        <div>
          {allPost.map((data, index) => {
            return (
              <div key={index}>
                <ShowIndivisulaPost data={data} />
              </div>
            );
          })}
        </div>
      ) : (
        <h1 className="showAllPosts_NoPost__h1">No Post Yet...</h1>
      )}
    </>
  );
};

export default ShowAllPosts;
