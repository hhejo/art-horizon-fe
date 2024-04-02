// Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Firebase
import { auth } from "../firebase";

// 초기 상태값
const initialState = {
  value: {
    isLoggedIn: false,
    uid: "", // firebase auth uid
    docId: "", // users 컬렉션 docId
    email: "",
    nickname: "",
    imageURL: "", // 프로필 이미지 URL
    userType: "", // "A" (화가) or "N" (일반)
    desc: "", // 상태 메시지
  },
};

// 로그인 된 현재 사용자 정보를 Redux에 설정
export const setCurrentUser = createAsyncThunk(
  "user/setCurrentUser",
  async (user, { rejectWithValue }) => {
    try {
      const { uid, docId, email } = user;
      const { displayName: nickname, photoURL: imageURL } = user;
      return { uid, docId, email, nickname, imageURL, desc: "", userType: "N" };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      auth.signOut();
      state.value = initialState.value;
    },
  },
  extraReducers: {
    // setCurrentUser.fulfilled
    [setCurrentUser.fulfilled]: (state, action) => {
      const { uid, docId, email, nickname, imageURL } = action.payload;
      state.value = { isLoggedIn: true, uid, docId, email, nickname, imageURL };
    },
    // setCurrentUser.rejected
    [setCurrentUser.rejected]: (state, action) => {
      state.value = initialState.value;
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice;
