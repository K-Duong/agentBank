import { useDispatch } from "react-redux";
import { useGetUserProfileMutation } from "../utils/apiSlice";
import { loadingUser, successUser, errorUser } from "../features/userSlice";
import { useAuthState } from "./useAuthState";
import { useUserState } from "./useUserState";

export const useFetchUserState = () => {
  const dispatch = useDispatch()
  const [getUserProfile] = useGetUserProfileMutation();
  const { isAuth } = useAuthState();
  const userState = useUserState();

  const fetchApi = async () => { 
    if (isAuth) {
      dispatch(loadingUser(userState));
      try {
        const res = await getUserProfile().unwrap();
        dispatch(successUser(res.body));
      } catch (err) {
        dispatch(errorUser(err));
      }
    } 
  };
 
  
  return fetchApi;
};


