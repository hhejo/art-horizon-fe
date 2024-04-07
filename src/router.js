// Router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// Component
import Layout from "./Layout";
import PrivateRoute from "./route/PrivateRoute";
import ProtectedRoute from "./route/ProtectedRoute";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import MyPage from "./pages/mypage/MyPage";
import UserModify from "./pages/usermodify/UserModify";
import Pieces from "./pages/pieces/Pieces";
import Piece from "./pages/piece/Piece";
import Register from "./pages/register/Register";
import StyleTransfer from "./pages/style-transfer/StyleTransfer";
import Scent from "./pages/scent/Scent";
import NotFound from "./pages/not-found/NotFound";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      {/* 로그인 X */}
      <Route element={<ProtectedRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      {/* 로그인 O */}
      <Route element={<PrivateRoute />}>
        <Route path="usermodify" element={<UserModify />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* 로그인 상관 없음 */}
      <Route path="mypage/:targetDocId" element={<MyPage />} />
      <Route path="pieces" element={<Pieces />} />
      <Route path="piece" element={<Piece />} />
      <Route path="style" element={<StyleTransfer />} />
      <Route path="scent" element={<Scent />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
