import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetUserProfileMutation } from "../utils/apiSlice";
import { loadingUser, successUser, errorUser, resetUser } from "../features/userSlice";
import { useAuthState } from "./useAuthState";
import { useUserState } from "./useUserState";

export const useSetUserState = () => {
  const dispatch = useDispatch()
  const [getUserProfile] = useGetUserProfileMutation();
  const { isAuth } = useAuthState();
  const userState = useUserState();

  const fetchApi = async () => { 
    console.log("set user state");
    if (isAuth) {
      dispatch(loadingUser(userState));
      try {
        const res = await getUserProfile().unwrap();
        dispatch(successUser(res.body));
      } catch (err) {
        dispatch(errorUser(err));
      }
    } else {
      // TODO: really need this line ?
      dispatch(resetUser(userState));
    }
  };
 
  
  return fetchApi;
};


