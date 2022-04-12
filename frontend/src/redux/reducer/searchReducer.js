const initialState = [];
const searchBlogReducer = async (state = initialState, action) => {
  switch (action.type) {
    case "SEARCHBLOG":
      return action.payload;
    default:
      return state;
  }
};

export { searchBlogReducer };
