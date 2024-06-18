import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatchAction } from "../../hooks/useDispatchAction";
import { useAuthState } from "../../hooks/useAuthState";
import { useUserState } from "../../hooks/useUserState";
import { useLoginMutation } from "../../utils/apiSlice";
import { useFetchUserState } from "../../hooks/useFetchUserState";
import {
  logingError,
  logingPending,
  logingSuccess,
} from "../../features/authSlice";
import Button from "../button";
import "./style.scss";

function FormSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const authState = useAuthState();

  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatchLogingPending = useDispatchAction(logingPending);
  const dispatchLogingSuccess = useDispatchAction(logingSuccess);
  const dispatchLogingError = useDispatchAction(logingError);
  const fetchUserProfile = useFetchUserState();

  useEffect(() => {
    if (authState.isAuth) {
      fetchUserProfile();
    }
  }, [authState.isAuth]);

  const handleChangeUserName = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePw = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatchLogingPending(authState);

    try {
      const response = await login({ email, password }).unwrap();
      // console.log("Response:", response);
      dispatchLogingSuccess(response.body.token);
      await fetchUserProfile();
      navigate("/profile");
    } catch (error) {
      console.log(error);
      dispatchLogingError(error.data);
      setMessage(() => {
        if (error.data) {
          return error.data.message.slice(6);
        } else {
          return "Oops, something went wrong! Please try again";
        }
      });
    }
    setEmail("");
    setPassword("");
  };

  return (
    <form action="" className="form-sign-in">
      <header className="form-sign-in-header">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1 className="form-sign-in-header-title">Sign In</h1>
        {message ? <p className="error-message">{message}</p> : ""}
      </header>
      <div className="form-sign-in-content">
        <div className="user-name-container">
          <label name="user-name">Username</label>
          <input
            type="text"
            name="user-name"
            id="sign-in-user-name"
            value={email}
            onChange={handleChangeUserName}
            required
          />
        </div>

        <div className="password-container">
          <label name="password">Password</label>
          <input
            type="text"
            name="password"
            id="sign-in-password"
            value={password}
            onChange={handleChangePw}
            required
          />
        </div>
      </div>

      <div className="remember-me">
        <input type="checkbox" name="remember-me" id="remember-me" />
        <label name="remember-me">Remember me</label>
      </div>

      <Button type="submit" handleClick={handleSubmit}>Sign In</Button>
    </form>
  );
}

export default FormSignIn;
