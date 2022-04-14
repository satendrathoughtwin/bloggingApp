import { combineReducers } from "redux";
import { searchBlogReducer } from "./searchReducer";
import { setLocalStorageReducer } from "./localStorageReducer";
import { showBlogInfoReducer } from "./showBlogInfoReducer";
const rootReducer = combineReducers({
  searchBlogReducer,
  setLocalStorageReducer,
  showBlogInfoReducer,
});

export default rootReducer;
