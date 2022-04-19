import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getPostById } from "../../services/api";
import "./Likes.css";
const Likes = ({ id }) => {
  const [showLikes, setShowLikes] = useState([]);
  const showLikersData = async (id) => {
    const result = await getPostById(id);
    if (result) {
      setShowLikes(result[0].like);
    }
  };
  useEffect(() => {
    showLikersData(id);
  }, [id]);
  return (
    <>
      <section className="likes_Section">
        <header>Likes</header>
        {showLikes ? (
          showLikes.map((data, ind) => {
            return (
              <>
                <div className="likesDiv" key={ind}>
                  <img
                    src={
                      data.imgUrl ||
                      "https://25hournews.com/imgs/news/3154.jpg?v=1597387286"
                    }
                    alt="liker pic"
                  />
                  <NavLink to={`/otherUserProfile/${data}`}>{data}</NavLink>
                </div>
              </>
            );
          })
        ) : (
          <h3>No likes yet</h3>
        )}
      </section>
    </>
  );
};

export default Likes;
