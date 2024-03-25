// React
import { useState, useEffect } from "react";
// Component
import NavBar2 from "../../components/NavBar2";
import SignupForm from "./SignupForm";

import { piecesApi } from "../../api/api";

const Signup = () => {
  const [backgroundImg, setBackgroundImg] = useState();

  useEffect(() => {
    // 배경 그림 가져오기
    const fetchBackgroundImg = async () => {
      const res = await piecesApi.getBackgroundImage();
      setBackgroundImg(res.data.pieceImg);
    };
    fetchBackgroundImg();
  }, []);

  return (
    <>
      <NavBar2 />
      <section className="relative">
        {/* 배경 이미지 */}
        <div
          className="absolute bg-gray-700 -z-50"
          style={{ width: "100vw", height: "100vh" }}
        ></div>
        {backgroundImg && (
          <div
            className="absolute inset-0 bg-center bg-cover blur"
            style={{
              width: "100vw",
              height: "100vh",
              backgroundImage: `url('http://j7d201.p.ssafy.io/api/my-file/read/${backgroundImg}')`,
            }}
          ></div>
        )}

        {/* 회원가입 폼 */}
        <SignupForm />
      </section>
    </>
  );
};

export default Signup;
