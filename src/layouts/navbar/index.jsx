import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthState } from "../../hooks/useAuthState";
import { useUserState } from "../../hooks/useUserState";
import { useDispatchAction } from "../../hooks/useDispatchAction";
import { logingOut } from "../../features/authSlice";
import { resetUserState } from "../../features/userSlice";
import logo from "../../assets/logo/argentBankLogo.png";
import "./style.scss";

function NavBar() {
  const authState = useAuthState();
  const userState = useUserState();

  const navigate = useNavigate();
  const dispatchLogingOut = useDispatchAction(logingOut);
  const dispatchResetUser = useDispatchAction(resetUserState);

  const handleSignOut = () => {
    console.log("log out");
    //TODO: manually reset userInfo -> to try with middleware
    dispatchLogingOut(authState);
    dispatchResetUser(userState);
    navigate("/");
  };

  return (
    <nav className="navbar-wrapper">
      <NavLink to="/" className="logo-container">
        <img className="logo-agentBank" alt="Argent Bank Logo" src={logo} />
      </NavLink>
      <ul className="links">
        {authState.isAuth ? (
          <>
            <NavLink to="/profile">
              <FontAwesomeIcon icon="fa-solid fa-circle-user" />
              <div>{userState.user.firstName}</div>
            </NavLink>
            <NavLink to="/">
              <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
              <div onClick={handleSignOut}>Sign Out</div>
            </NavLink>
          </>
        ) : (
          <NavLink to="/login">
            <FontAwesomeIcon icon="fa-solid fa-circle-user" />
            <div>Sign In</div>
          </NavLink>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
