import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { loggedIn } = useSelector((state) => state.auth.value);

  if (loggedIn) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
