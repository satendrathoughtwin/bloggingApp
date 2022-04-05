import React from "react";
import "./ShowIndivisualPost.css";
import { useNavigate } from "react-router-dom";
const ShowIndivisulaPost = ({ data, key }) => {
  const navigate = useNavigate();
  return (
      <section
        className="mainSection"
        onClick={()=> navigate(`/indivisualblog/${data._id}`) }
      >
        <div>
          <img src={data.imgUrl} />
        </div>
        <div className="contentDiv">
          <div className="headerDiv">
            <strong>{data.title}</strong>
            <strong>{data.date_Time}</strong>
          </div>
          <section className="contentDivSection">
            <span dangerouslySetInnerHTML={{ __html: data.description }} />
          </section>
          <div>
            <button>See More...</button>
          </div>
        </div>
      </section>
  );
};

export default ShowIndivisulaPost;
