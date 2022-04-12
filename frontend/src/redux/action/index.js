const searchBlogAction = (data) => {
  return {
    type: "SEARCHBLOG",
    payload: data,
  };
};

export { searchBlogAction };
