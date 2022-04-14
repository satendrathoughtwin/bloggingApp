import { getPostById } from "../../services/api";

const searchBlogAction = (data) => {
  return {
    type: "SEARCHBLOG",
    payload: data,
  };
};
const showCommentAction = (data) => {
  return {
    type: "TOTAL_COMMENT",
    payload: data,
  };
};

export { searchBlogAction,showCommentAction };
