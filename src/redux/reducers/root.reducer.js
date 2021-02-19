import { combineReducers } from "redux";
// import authReducer from "./userReducers/auth.reducer";

import authReducer from "./auth.reducers";
import messagesReducer from "./messages.reducer";

const rootReducer = combineReducers({
  // user: userReducer,
  // appUI: appUiReducer
  auth: authReducer,
  message: messagesReducer,
});

export default rootReducer;
