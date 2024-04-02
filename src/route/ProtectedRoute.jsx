// Router
import { Navigate, Outlet, useOutletContext } from "react-router-dom";

const ProtectedRoute = () => {
  const { isLoggedIn } = useOutletContext(); // Outlet으로 전달된 loggedIn
  // 로그인 되었으면 /로 이동
  if (isLoggedIn) return <Navigate to="/" replace />;
  // 로그인 되지 않았으면, 로그인 없이 가능한 서비스에 접근
  return <Outlet />;
};

export default ProtectedRoute;
