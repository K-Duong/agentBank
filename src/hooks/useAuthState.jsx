import { useSelector } from "react-redux";

export const useAuthState = () => {
  const authState = useSelector((state) => state.auth);
  return authState
}
