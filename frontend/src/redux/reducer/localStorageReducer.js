const initialState = "";
const setLocalStorageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOCAL_STORAGE":
      return action.payload;
    default:
      return state;
  }
};

export { setLocalStorageReducer };
