import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatchAction } from "../../hooks/useDispatchAction";
import { useAuthState } from "../../hooks/useAuthState";
import { useFetchUserState } from "../../hooks/useFetchUserState";
import { useLoginMutation } from "../../utils/apiSlice";

import {
  logingError,
  logingPending,
  logingSuccess,
} from "../../features/authSlice";

import Button from "../button";
import "./style.scss";

function FormSignIn() {
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isHidden: true,
  });
  const [email, setEmail] = useState({
    value: "",
    isValidate: true,
    errorMessage: "",
  });

  const authState = useAuthState();

  const [login] = useLoginMutation();
  const navigate = useNavigate();

  // dispatch actions
  const dispatchLogingPending = useDispatchAction(logingPending);
  const dispatchLogingSuccess = useDispatchAction(logingSuccess);
  const dispatchLogingError = useDispatchAction(logingError);
  const fetchUserProfile = useFetchUserState();

  useEffect(() => {
    const fetchProfileAndNavigate = async () => {
      if (authState.isAuth) {
        await fetchUserProfile();
        navigate("/profile")
      }
    };
    fetchProfileAndNavigate();
  }, [authState.isAuth]);

  const handleChangeEmail = (e) => {
    const value = e.target.value.trim().toLowerCase();
    const emailRegex = new RegExp(
      /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
    );
    setEmail((prev) => {
      return {
        ...prev,
        value: value,
        isValidate: emailRegex.test(value),
        errorMessage: emailRegex.test(value)
          ? ""
          : "Please enter a valid email!",
      };
    });
  };

  const handleChangePw = (e) => {
    const value = e.target.value;
    setPassword((prev) => {
      return {
        ...prev,
        value: value,
      };
    });
  };

  const handleToggleShowPassword = () => {
    setPassword((prev) => {
      return {
        ...prev,
        isHidden: !prev.isHidden,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.errorMessage.length > 0) {
      return;
    } else {
      dispatchLogingPending(authState);
      try {
        const response = await login({
          email: email.value,
          password: password.value,
        }).unwrap();
        dispatchLogingSuccess(response.body.token);
        await fetchUserProfile();
        setEmail((prev) => {
          return {
            ...prev,
            value: "",
            isValidate: true,
            errorMessage: "",
          };
        });
        setPassword((prev) => {
          return {
            ...prev,
            value: "",
            isHidden: true,
          };
        });
      } catch (error) {
        console.log(error);
        dispatchLogingError(error.data);
        setMessage("Invalid user. Please try again!");
      }
    }
  };

  return (
    <form action="" className="form-sign-in">
      <header className="form-sign-in-header">
        <FontAwesomeIcon icon="fa-solid fa-circle-user" />
        <h1 className="form-sign-in-header-title">Sign In</h1>
        {message ? <p className="error-message">{message}</p> : ""}
      </header>
      <div className="form-sign-in-content">
        <div className="user-name-container">
          <label name="user-name">Username</label>
          <input
            className={email.isValidate ? "input-email" : "error"}
            type="text"
            name="user-name"
            id="sign-in-user-name"
            value={email.value}
            onChange={handleChangeEmail}
            autoComplete="on"
            required
          />
          {email.isValidate ? (
            ""
          ) : (
            <p className="error-message">{email.errorMessage}</p>
          )}
        </div>

        <div className="password-container">
          <label name="password">Password</label>
          <div className="input-pw-container">
            <FontAwesomeIcon
              icon={
                password.isHidden ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
              }
              onClick={handleToggleShowPassword}
            />
            <input
              type={password.isHidden ? "password" : "text"}
              name="password"
              id="sign-in-password"
              value={password.value}
              onChange={handleChangePw}
              autoComplete="on"
              required
            />
          </div>
        </div>
      </div>

      <div className="remember-me">
        <input type="checkbox" name="remember-me" id="remember-me" />
        <label name="remember-me"> Remember me</label>
      </div>

      <Button className="btn-sign-in" type="submit" handleClick={handleSubmit}>
        Sign In
      </Button>
    </form>
  );
}

export default FormSignIn;
