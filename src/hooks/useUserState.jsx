import { useSelector } from "react-redux";

export const useUserState = () => {
  const userState = useSelector((state) => state.user);
  return userState
}
