import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

// Firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, firestore } from "./firebase";
// Slice
import { setCurrentUser } from "./redux/authSlice";

import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";

import { getUser } from "./redux/authSlice";

import GlobalStyle from "./GlobalStyle";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import MyPage from "./pages/mypage/MyPage";
import UserModify from "./pages/usermodify/UserModify";
import Pieces from "./pages/pieces/Pieces";
import Search from "./pages/search/Search";
import Piece from "./pages/piece/Piece";
import Register from "./pages/register/Register";
import Filter from "./pages/filter/Filter";
import StyleTransfer from "./pages/style-transfer/StyleTransfer";
import Scent from "./pages/scent/Scent";
import NotFound from "./pages/not-found/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <ProtectedRoute>
        <Signup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/usermodify",
    element: (
      <PrivateRoute>
        <UserModify />
      </PrivateRoute>
    ),
  },
  {
    path: "/mypage/:targetUserSeq",
    element: <MyPage />,
  },
  {
    path: "/pieces",
    element: <Pieces />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/pieces/:pieceSeq",
    element: <Piece />,
  },
  {
    path: "/filter",
    element: <Filter />,
  },
  {
    path: "/register",
    element: (
      <PrivateRoute>
        <Register />
      </PrivateRoute>
    ),
  },
  {
    path: "/style",
    element: <StyleTransfer />,
  },
  {
    path: "/scent",
    element: <Scent />,
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

const App = () => {
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const { loggedIn } = useSelector((state) => state.auth.value);
  AOS.init();

  // React.useEffect(() => {
  //   if (localStorage.getItem("access-token")) {
  //     dispatch(getUser()); // localStorage에 access-token (JWT) 있으면 getUser()로 로그인 사용자 정보 가져옴
  //   }
  // }, [dispatch, isLoggedIn]);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) return; // 유저가 로그인되어 있지 않으면 종료
      // 현재 로그인한 user의 정보를 firestore의 users 컬렉션에서 가져오는 함수
      async function fetchUserWithUid() {
        const collectionRef = collection(firestore, "users");
        const q = query(collectionRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 1) {
          console.error("동일 uid의 여러 document 감지"); // 2개 이상이면 에러
          return;
        } else if (querySnapshot.size === 0) {
          console.log("유저를 찾을 수 없음"); // 0개 이면 유저가 없어 에러
          return;
        }
        dispatch(setCurrentUser({ ...user, docId: querySnapshot.docs[0].id })); // Redux에 로그인한 유저 정보 적용하기
      }
      fetchUserWithUid(); // fetchUserWithUid 실행
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <React.Fragment>
      <GlobalStyle />
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </React.Fragment>
  );
};

export default App;
