import { useSelector } from "react-redux";


export const useIsAuth = () => {
  const {isAuth} = useSelector((state) => state.auth);
  return isAuth
}

export const useAuthState = () => {
  const authState = useSelector((state) => state.auth);
  return authState
}