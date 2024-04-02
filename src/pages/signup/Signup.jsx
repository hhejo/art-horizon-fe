// React, Router, Redux
// import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// Firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
// Slice
import { setCurrentUser } from "../../redux/user-slice";
// Toast
import { toast } from "react-toastify";
// Component
import { NavMini } from "../../components/NavMini";
import SignupForm from "./SignupForm";

// import { piecesApi } from "../../api/api";

const Signup = () => {
  const [dispatch, navigate] = [useDispatch(), useNavigate()];

  // const [backgroundImg, setBackgroundImg] = useState();

  // // 배경 그림 가져오기
  // useEffect(() => {
  //   const fetchBackgroundImg = async () => {
  //     const res = await piecesApi.getBackgroundImage();
  //     setBackgroundImg(res.data.pieceImg);
  //   };
  //   fetchBackgroundImg();
  // }, []);

  // 회원가입 핸들러
  const signupHandler = async (signupData) => {
    const { email, nickname, password: pw } = signupData; // 회원가입 폼에 입력한 email, password, nickname
    // dispatch(startLoading()); // 로딩 화면 시작
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, pw); // 1. firebase authentication에 회원가입 유저 생성하고 해당 유저 정보 받기
      await updateProfile(user, { displayName: nickname }); // 2. firebase authentication에 회원가입 시 입력된 닉네임도 적용
      const basic = { uid: user.uid, email, nickname, password: "" }; // 기본 유저 정보
      const extra = { imageURL: "", userType: "N", desc: "안녕하세요." }; // 추가 유저 정보
      const userToAdd = { ...basic, ...extra }; // firestore의 users 컬렉션에 추가할 회원가입된 유저
      const docRef = await addDoc(collection(firestore, "users"), userToAdd); // 3. firestore의 users 컬렉션에 회원가입 유저 추가하고 해당 document 받기
      const currentUser = { ...user, docId: docRef.id }; // Redux에 저장할 회원가입 유저 정보
      dispatch(setCurrentUser(currentUser)); // 4. Redux에 회원가입한 유저 정보 저장. 현재 로그인한 유저가 됨
      // alertToast(toastType.success, "회원가입 성공");
      toast.success("회원 가입 성공");
      // navigate("/teams", { replace: true });
      navigate("/", { replace: true });
    } catch (error) {
      const { code, message } = error; // 회원가입 에러
      if (code === "auth/email-already-in-use")
        toast.warning("이미 사용중인 이메일");
      // alertToast(toastType.warning, "이미 사용중인 이메일");
      else if (code == "auth/weak-password")
        toast.warning("비밀번호는 6자 이상");
      else toast.error("회원가입 오류");
      // else alertToast(toastType.error, "회원가입 오류"); // 기타 에러
      console.error(message);
    } finally {
      // dispatch(stopLoading()); // 로딩 화면 종료
    }
  };

  return (
    <>
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

        {/* 회원가입 폼 */}
        <SignupForm signup={signupHandler} />
      </section>
    </>
  );
};

export default Signup;
