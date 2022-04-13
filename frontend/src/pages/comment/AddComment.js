import React, { useEffect, useState } from "react";
import "./AddComment.css";
import { NavLink } from "react-router-dom";
import { getPostById } from "../../services/api";
const AddComment = ({ id }) => {
  const [addComment, setComment] = useState("");
  const [rowCount, setRowCount] = useState(3);
  const [showComment, setShowComment] = useState([]);
  const saveComment = async (e) => {
    setComment(e.target.value);
  };
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      console.log("enter event");
      if (rowCount < 8) setRowCount(rowCount + 1);
    }
  };
  const showCommentsData = async (id) => {
    const result = await getPostById(id);
    if (result) {
      console.log(result[0].comment);
      setShowComment(result[0].comment);
    }
  };
  useEffect(() => {
    showCommentsData(id);
  }, [id]);
  return (
    <>
      <section className="addComment_Section">
        <header>Comments</header>
        <div>
          <textarea
            type="text"
            placeholder="Add a comment"
            value={addComment}
            onChange={saveComment}
            className="addCommentTextArea"
            onKeyDown={handleKeyDown}
            rows={rowCount}
          />
        </div>
        <div className="addComment_Div">
          {showComment &&
            showComment.map((data, ind) => {
              return (
                <>
                  <div>
                    <div className="addComment_commenterDiv">
                      <img
                        src="https://25hournews.com/imgs/news/3154.jpg?v=1597387286"
                        alt="commenter pic"
                      />
                      <NavLink to="/">satendrasahu822gmail.com</NavLink>
                    </div>
                    <p className="addComment_commenterP">
                      Ipsum has been the industry's standard dummy text ever
                      since the 1500s, when an unknown printer took a galley of
                      type and scrambled it to make a type specimen book. It has
                      survived not only five cent
                    </p>
                  </div>
                </>
              );
            })}
        </div>
      </section>
      <div className="addComment_ButtonDiv">
        <button type="submit">Send</button>
        <button type="cancel">Cancel</button>
      </div>
    </>
  );
};

export default AddComment;
