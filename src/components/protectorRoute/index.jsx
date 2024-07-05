import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "../../hooks/useAuthState";

function ProtectorRoute() {
  const { isAuth } = useAuthState();
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

export default ProtectorRoute;
