import React, { useEffect, useState } from "react";
import "./IndivisualBlogPage.css";
import { useParams } from "react-router-dom";
import { getPostById } from "../../services/api";
import BlogProfile from "../../components/blogProfile/BlogProfile";
const IndivisualBlogPage = () => {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState([]);

  const getBlogById = async () => {
    const result = await getPostById(blogId);
    if (result) {
      setBlogData(result[0]);
    }
  };
  useEffect(() => {
    getBlogById();
  }, []);

  return (
    <section className="indivisualBlogPageSection">
      <BlogProfile BlogData ={blogData} blogId={blogId}/>
    </section>
  );
};

export default IndivisualBlogPage;
