import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { useSelector } from "react-redux";
// import { useSelectedAuth } from "../../hooks";


import Button from "../button";
import "./style.scss";
import { useLoginMutation } from "../../utils/apiSlice";
import {
  logingError,
  logingPending,
  logingSuccess,
} from "../../features/authSlice";

function FormSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  // const state = useSelectedAuth();
  const state = useSelector(state => state.auth);

  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeUserName = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePw = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(logingPending(state));

    try {
      const response = await login({ email, password }).unwrap();
      console.log("Response:", response);
      dispatch(logingSuccess(response.body.token));
      navigate("/profile")
    } catch (error) {
      dispatch(logingError(error.data));
      setMessage("User not found!");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <form action="" className="form-sign-in">
      <header className="form-sign-in-header">
        <img alt="icon font awesome" />
        <h1 className="form-sign-in-header-title">Sign In</h1>
        {state.error ? <p className="error-message">{message}</p> : ""}
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
          />
        </div>
      </div>

      <div className="remember-me">
        <input type="checkbox" name="remember-me" id="remember-me" />
        <label name="remember-me">Remember me</label>
      </div>

      <Button handleClick={handleSubmit}>Sign In</Button>
    </form>
  );
}

export default FormSignIn;
