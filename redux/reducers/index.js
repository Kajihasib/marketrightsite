import { combineReducers } from "redux";
import commonReducer from "./common";
import homeReducer from "./home";
import metaReducer from "./meta";
import publicReducer from "./public";
const rootReducer = combineReducers({
  meta: metaReducer,
  home: homeReducer,
  common: commonReducer,
  public: publicReducer,
});

export default rootReducer;
