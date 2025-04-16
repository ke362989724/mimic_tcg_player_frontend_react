import { createSlice } from "@reduxjs/toolkit";

export interface UserProfile {
  avatar: string;
  nickname: string;
}

const initialState: UserProfile = {
  avatar: "",
  nickname: "",
};

const userSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfile(state, action: { payload: Partial<UserProfile> }) {
      return { ...state, ...action.payload };
    },
    clearUserProfile() {
      return initialState;
    },
  },
});

export const { setUserProfile, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
