// React, Router, Redux
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, firestore } from "./firebase";
// Slice
import { setCurrentUser } from "./redux/user-slice";
// Components
import { Nav } from "./components/Nav";
import { NavMini } from "./components/NavMini";

const Layout = () => {
  const [dispatch, location] = [useDispatch(), useLocation()];
  const { isLoggedIn } = useSelector((state) => state.user.value);

  // URL에 따라 다른 내비게이션 바 렌더링
  const renderNav = () => {
    const path = location.pathname;
    if (path === "/login" || path === "/signup") return <NavMini />; // 로그인, 회원가입 페이지
    return <Nav />; // 나머지 페이지
  };

  // 로그인 상태 확인하고 Redux에 적용
  useEffect(() => {
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
    <div className="flex flex-col h-full w-full">
      {renderNav()}
      <Outlet context={{ isLoggedIn }} />
    </div>
  );
};

export default Layout;
