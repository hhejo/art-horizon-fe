import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../firebase";

import { authApi } from "../api/api";

// 초기 상태값
const initialState = {
  value: {
    loggedIn: false,
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

export const getUser = createAsyncThunk(
  "authSlice/getUser",
  async (_, { rejectWithValue, getState }) => {
    return {};
    // // const isLoggedIn = getState().auth.isLoggedIn;
    // // if (!isLoggedIn) {
    // //   return rejectWithValue();
    // // }
    // try {
    //   const res = await authApi.getUser();
    //   return res.data;
    // } catch (err) {
    //   return rejectWithValue(JSON.parse(err));
    // }
  }
);

export const login = createAsyncThunk(
  "authSlice/login",
  async (credentials, { rejectWithValue }) => {
    localStorage.setItem("access-token", `jwt ${"tempAccessToken"}`);
    // try {
    //   const res = await authApi.login(credentials);
    //   localStorage.setItem("access-token", `jwt ${res.data.jwt}`);
    //   // // axios.defaults.headers.common["Authorization"] = `jwt ${res.data}`;
    // } catch (err) {
    //   return rejectWithValue(JSON.parse(err));
    // }
  }
);

export const signup = createAsyncThunk(
  "authSlice/signup",
  async (credentials, { rejectWithValue }) => {
    localStorage.setItem("access-token", `jwt ${"tempAccessToken"}`);
    // try {
    //   const res = await authApi.signup(credentials);
    //   localStorage.setItem("access-token", `jwt ${res.data.jwt}`);
    // } catch (err) {
    //   return rejectWithValue(JSON.parse(err));
    // }
  }
);

export const quit = createAsyncThunk(
  "authSlice/quit",
  async (_, { rejectWithValue }) => {
    try {
      // axios.defaults.headers.common[
      //   "Authorization"
      // ] = `jwt ${localStorage.getItem("access-token")}`;
      const res = await authApi.quit();
      localStorage.removeItem("access-token");
      return res.data;
    } catch (err) {
      return rejectWithValue(JSON.parse(err.response));
    }
  }
);

export const changeProfile = createAsyncThunk(
  "authSlice/changeProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const res = await authApi.changeProfile(profileData);
      return res.data;
    } catch (err) {
      return rejectWithValue(JSON.parse(err.response));
    }
  }
);

export const changePassword = createAsyncThunk(
  "authSlice/changePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const res = await authApi.changePassword(passwordData);
      return res.data;
    } catch (err) {
      return rejectWithValue(JSON.parse(err.response));
    }
  }
);

export const changeType = createAsyncThunk(
  "authSlice/changeType",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.changeType();
      return res.data;
    } catch (err) {
      return rejectWithValue(JSON.parse(err.response));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUserInfoSelector: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      auth.signOut();
      state.value = initialState.value;
    },
    // logout: (state) => {
    //   state.isLoggedIn = false;
    //   state.mySeq = 0;
    //   state.myEmail = "";
    //   state.myNickname = "";
    //   state.myImageURL = "";
    //   state.myUserType = "";
    //   state.myDesc = "";
    //   localStorage.removeItem("access-token");
    //   // toast.success("성공적으로 로그아웃했습니다");
    //   // window.location.reload();
    // },
  },
  extraReducers: {
    [login.fulfilled]: (state) => {
      state.isLoggedIn = true;
    },
    // setCurrentUser.fulfilled
    [setCurrentUser.fulfilled]: (state, action) => {
      const { uid, docId, email, nickname, imageURL } = action.payload;
      state.value = { loggedIn: true, uid, docId, email, nickname, imageURL };
    },
    // setCurrentUser.rejected
    [setCurrentUser.rejected]: (state, action) => {
      state.value = initialState.value;
    },
    // [getUser.fulfilled]: (state, action) => {
    //   state = {
    //     isLoggedIn: true,
    //     mySeq: 1,
    //     myEmail: "gmlwn@naver.com",
    //     myNickname: "hejo",
    //     myImageURL: "",
    //     myUserType: "",
    //     myDesc: "안녕안녕",
    //   };
    //   const userInfo = action.payload;
    //   state.isLoggedIn = true;
    //   state.mySeq = userInfo.userSeq;
    //   state.myEmail = userInfo.userEmail;
    //   state.myNickname = userInfo.userNickname;
    //   state.myImageURL = userInfo.userImg;
    //   state.myUserType = userInfo.userType;
    //   state.myDesc = userInfo.userDesc;
    // },
    // [getUser.rejected]: (state, action) => {
    //   state.isLoggedIn = false;
    //   state.mySeq = 0;
    //   state.myEmail = "";
    //   state.myNickname = "";
    //   state.myImageURL = "";
    //   state.myUserType = "";
    //   state.myDesc = "";
    // },
    // [quit.fulfilled]: (state) => {
    //   state.isLoggedIn = false;
    //   state.mySeq = 0;
    //   state.myEmail = "";
    //   state.myNickname = "";
    //   state.myImageURL = "";
    //   state.myUserType = "";
    //   state.myDesc = "";
    // },
  },
});

export const { logout } = authSlice.actions;
export default authSlice;
