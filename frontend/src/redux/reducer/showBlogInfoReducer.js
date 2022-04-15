

const commentInitialState = "";

const showBlogInfoReducer =(state = commentInitialState, action) => {
  switch (action.type) {
    case "TOTAL_COMMENT":
      return action.payload;
    default:
      return state;
  }
};

export { showBlogInfoReducer };
