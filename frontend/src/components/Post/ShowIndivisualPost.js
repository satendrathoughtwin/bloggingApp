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
            <h1>User Name</h1>
            <h3>{data.date_Time}</h3>
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
