// React, Router, Redux
// import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
// Slice
import { setCurrentUser } from "../../redux/authSlice";
// Toast
import { toast } from "react-toastify";

// import { piecesApi } from "../../api/api";

// Component
import NavBar2 from "../../components/NavBar2";
import LoginForm from "./LoginForm";

const Login = () => {
  const [dispatch, navigate] = [useDispatch(), useNavigate()];
  // const [backgroundImg, setBackgroundImg] = useState();

  // useEffect(() => {
  //   const fetchBackgroundImg = async () => {
  //     const res = await piecesApi.getBackgroundImage();
  //     setBackgroundImg(res.data.pieceImg);
  //   };
  //   fetchBackgroundImg(); // 배경 그림 가져오기
  // }, []);

  // 로그인 핸들러
  const loginHandler = async (loginData) => {
    const { email, password: pw } = loginData; // 로그인 폼에 입력한 email, password
    // dispatch(startLoading()); // 로딩 화면 시작
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, pw); // 1. firebase authentication에서 email, password가 일치하는 유저 정보 가져오기
      dispatch(setCurrentUser(user)); // 2. Redux에 로그인 유저 정보 저장. 현재 로그인한 유저가 됨. docId는 없지만 어차피 App.js에서 작업
      // alertToast(toastType.success, "로그인 성공");
      toast.success("로그인 성공");
      navigate("/", { replace: true }); // /teams로 리다이렉트하고 뒤로가기 방지
    } catch (error) {
      const { code, message } = error; // 로그인 에러
      if (code === "auth/invalid-credential")
        toast.warning("유효하지 않은 이메일이나 비밀번호");
      // alertToast(toastType.warning, "유효하지 않은 이메일이나 비밀번호");
      else toast.error("로그인 오류");
      // else alertToast(toastType.error, "로그인 오류");
      console.error(message);
    } finally {
      // dispatch(stopLoading()); // 로딩 화면 종료
    }
  };

  return (
    <>
      <NavBar2 />
      <section className="relative">
        {/* 배경 이미지 */}
        <div
          className="absolute bg-gray-700 -z-50"
          style={{ width: "100vw", height: "100vh" }}
        ></div>
        {/* {backgroundImg && (
          <div
            className="absolute inset-0 bg-center bg-cover blur"
            style={{
              width: "100vw",
              height: "100vh",
              backgroundImage: `url('http://j7d201.p.ssafy.io/api/my-file/read/${backgroundImg}')`,
            }}
          ></div>
        )} */}

        {/* 로그인 폼 */}
        <LoginForm login={loginHandler} />
      </section>
    </>
  );
};

export default Login;
