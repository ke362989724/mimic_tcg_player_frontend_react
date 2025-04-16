import { combineReducers } from "@reduxjs/toolkit";
import userReducer, { UserProfile } from "./userReducer";

export interface RootState {
  userProfile: UserProfile;
}

const rootReducer = combineReducers({
  userProfile: userReducer,
});

export default rootReducer;
