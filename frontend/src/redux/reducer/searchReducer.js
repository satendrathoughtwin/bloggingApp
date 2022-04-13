const initialState = "";
const searchBlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCHBLOG": {
      const data = action.payload;
      return data;
    }

    default:
      return state;
  }
};

export { searchBlogReducer };
