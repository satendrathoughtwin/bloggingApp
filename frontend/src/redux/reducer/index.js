import { combineReducers } from "redux";
import { searchBlogReducer } from "./searchReducer";
const rootReducer = combineReducers({
  searchBlogReducer,
});

export default rootReducer;
