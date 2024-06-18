import { useDispatch } from "react-redux";
import { useGetUserProfileMutation } from "../utils/apiSlice";
import { loadUser, userLoadedSuccessfully, userLoadingFailed } from "../features/userSlice";
import { useAuthState } from "./useAuthState";
import { useUserState } from "./useUserState";

export const useFetchUserState = () => {
  const dispatch = useDispatch()
  const [getUserProfile] = useGetUserProfileMutation();
  const { isAuth } = useAuthState();
  const userState = useUserState();

  const fetchApi = async () => { 
    if (isAuth) {
      dispatch(loadUser(userState));
      try {
        const res = await getUserProfile().unwrap();
        dispatch(userLoadedSuccessfully(res.body));
      } catch (err) {
        console.log(err);
        dispatch(userLoadingFailed(err));
      }
    } 
  };
 
  
  return fetchApi;
};


