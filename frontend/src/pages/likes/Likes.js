import React from "react";
import { NavLink } from "react-router-dom";
import MyModle from "../../components/Modal/MyModle";
import "./Likes.css";
const Likes = () => {
  return (
    <>
      <section className="likes_Section">
        <header>Likes</header>
        <div className="likesDiv">
          <img
            src="https://25hournews.com/imgs/news/3154.jpg?v=1597387286"
            alt="commenter pic"
          />
          <NavLink to="/">satendrasahu822gmail.com</NavLink>
        </div>
      </section>
    </>
  );
};

export default Likes;
