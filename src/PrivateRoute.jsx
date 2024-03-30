import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { loggedIn } = useSelector((state) => state.auth.value);

  if (loggedIn) return children;
  return <Navigate to="/" replace />;
};

export default PrivateRoute;
