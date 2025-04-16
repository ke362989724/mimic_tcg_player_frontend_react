// reducers/userReducer.ts
export interface UserProfile {
  avatar: string;
  nickname: string;
}

export type UserAction =
  | {
      type: "SET_USER_PROFILE";
      payload: Partial<UserProfile>;
    }
  | {
      type: "CLEAR_USER_PROFILE";
    };
