import { getPostById } from "../../services/api";

const commentInitialState = "zz";

const showBlogInfoReducer =async (state = commentInitialState, action) => {
  switch (action.type) {
    case "TOTAL_COMMENT":
      const result = await getPostById(action.payload);
      return result[0].comment.length;
    default:
      return state;
  }
};

export { showBlogInfoReducer };
