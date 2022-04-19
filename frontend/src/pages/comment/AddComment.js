import React, { useEffect, useState } from "react";
import "./AddComment.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  addComment,
  deleteComment,
  getPostById,
  updateComment,
} from "../../services/api";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { showCommentAction } from "../../redux/action";
import { toast } from "react-toastify";

const AddComment = ({ id, email }) => {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [showCommentSendButton, setShowCommentSendButton] = useState(false);
  const [rowCount, setRowCount] = useState(3);
  const [showComment, setShowComment] = useState([]);
  const [updateCommentId, setUpdateCommentId] = useState("");
  const [buttonType, setButtonType] = useState(true);
  const local_Storage_State = useSelector(
    (state) => state.setLocalStorageReducer
  );
  const dispatch = useDispatch();
  const showCommentsData = async (id) => {
    const result = await getPostById(id);
    if (result) {
      setShowComment(result[0].comment);
      await dispatch(showCommentAction(result[0].comment.length));
    }
  };

  const saveComment = async (e) => {
    console.log(!local_Storage_State)
    if (!local_Storage_State) {
      swal("Login first");
      navigate("/login");
      return
    }
    setComment(e.target.value);
  };

  const sendCommentOnDB = async () => {
    const body = {
      myProfileId: id,
      myProfileEmail: email,
      commenterId: local_Storage_State._id,
      commenterEmail: local_Storage_State.email,
      comment,
    };
    const result = await addComment(body);
    if (result) {
      toast("You have commented");
      showCommentsData(id);
      setComment("");
    }
  };

  const updateCommentOnDB = async (commentId) => {
    const body = {
      myProfileId: id,
      myProfileEmail: email,
      commenterId: local_Storage_State._id,
      commenterEmail: local_Storage_State.email,
      comment,
      commentId: updateCommentId,
    };

    const result = await updateComment(body);
    if (result.isProceed) {
      toast("comment has updated");
      showCommentsData(id);
      setComment("");
      setButtonType(true);
    } else toast("comment hasn't updated");
  };

  const editComment = async (commentId) => {
    setButtonType(false);

    const result = await showComment.filter((data) => data._id === commentId);
    if (result) {
      setComment(result[0].comment);
      setUpdateCommentId(commentId);
    }
  };
  const deleteCommentOnDB = async (commentId) => {
    const body = {
      myProfileId: id,
      myProfileEmail: email,
      commenterId: local_Storage_State._id,
      commenterEmail: local_Storage_State.email,
      commentId,
    };
    const result = await deleteComment(body);
    if (result.isProceed) {
      toast("comment has deleted");
      showCommentsData(id);
    } else toast("comment hasn't deleted");
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (rowCount < 8) setRowCount(rowCount + 1);
    }
  };

  useEffect(() => {
    showCommentsData(id);
  }, [id]);

  useEffect(() => {
    if (comment !== "") setShowCommentSendButton(true);
    else {
      setShowCommentSendButton(false);
    }
  }, [comment]);

  return (
    <>
      <section className="addComment_Section">
        <header>Comments</header>
        <div>
          <textarea
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={saveComment}
            className="addCommentTextArea"
            onKeyDown={handleKeyDown}
            rows={rowCount}
          />
        </div>
        <div className="addComment_Div">
          {setComment.length > 0 ? (
            showComment.map((data, ind) => {
              return (
                <>
                  <div>
                    <div className="addComment_commenterMainDiv">
                      <div className="addComment_commenterDiv">
                        <img
                          src={
                            data.imgUrl ||
                            "https://25hournews.com/imgs/news/3154.jpg?v=1597387286"
                          }
                          alt="commenter pic"
                        />
                        <NavLink
                          to={`/otherUserProfile/${data.commenterEmail}`}
                        >
                          {data.commenterEmail}
                        </NavLink>
                      </div>

                      {local_Storage_State?.email == data.commenterEmail ? (
                        <Popup
                          trigger={
                            <strong className="addComment3Dot">...</strong>
                          }
                          position="top center"
                        >
                          <button onClick={() => editComment(data._id)}>
                            <AiFillEdit />
                          </button>
                          <button onClick={() => deleteCommentOnDB(data._id)}>
                            <MdDelete />
                          </button>
                        </Popup>
                      ) : (
                        ""
                      )}
                    </div>

                    <p className="addComment_commenterP">{data.comment}</p>
                  </div>
                </>
              );
            })
          ) : (
            <h3>No Comments Yet</h3>
          )}
        </div>
      </section>
      <div className="addComment_ButtonDiv">
        {showCommentSendButton ? (
          <>
            {buttonType ? (
              <button type="submit" onClick={sendCommentOnDB}>
                Comment
              </button>
            ) : (
              <button type="submit" onClick={updateCommentOnDB}>
                update
              </button>
            )}
          </>
        ) : (
          ""
        )}

        <button type="cancel">Cancel</button>
      </div>
    </>
  );
};

export default AddComment;
