import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatchAction } from "../../hooks/useDispatchAction";
import { useAuthState } from "../../hooks/useAuthState";
import { useUserState } from "../../hooks/useUserState";
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
  // TODO: show entire hidden pw
  // const [hiddenPw, setHiddenPw] = useState("");
  const [message, setMessage] = useState("");

  const [password, setPassword] = useState({
    value: "",
    isHidden: true,
    hiddenValue: "",
    isValidate: true,
    errorMessage: "",
  });
  const [email, setEmail] = useState({
    value: "",
    isValidate: true,
    errorMessage: "",
  });

  const authState = useAuthState();
  const { id } = useUserState();

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
        if (id) {
          navigate(`/user/:${id}/profile`);
        }
      }
    };
    fetchProfileAndNavigate();
  }, [authState.isAuth, id]);

  const handleChangeEmail = (e) => {
    const value =  (e.target.value.trim()).toLowerCase();
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
    const passwordRegex = new RegExp(/^((?! )[\w&@#]+)$/);
    setPassword((prev) => {
      return {
        ...prev,
        value: value,
        isValidate: passwordRegex.test(value),
        errorMessage: passwordRegex.test(value)
          ? ""
          : "Please enter your correct password!",
      };
    });
  };

  const handleToggleShowPassword = () => {
    setPassword((prev) => {
      return {
        ...prev,
        isHidden : !prev.isHidden
      }
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatchLogingPending(authState);
    try {
      const response = await login({ email: email.value, password: password.value }).unwrap();
      dispatchLogingSuccess(response.body.token);
      await fetchUserProfile();
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
        isValidate: true,
        errorMessage: "",
      };
    });
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
            className={email.isValidate ? "input-email": "error"}
            type="text"
            name="user-name"
            id="sign-in-user-name"
            value={email.value}
            onChange={handleChangeEmail}
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
              icon={password.isHidden ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
              onClick={handleToggleShowPassword}
            />
            <input
            className={password.isValidate ? "input-pw" : "error" }
              type={password.isHidden ? "password" : "text"}
              name="password"
              id="sign-in-password"
              value={password.value}
              onChange={handleChangePw}
              autocomplete="on"
              required
            />
            {password.isValidate ? (
              ""
            ) : (
              <p className="error-message">{password.errorMessage}</p>
            )}
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
