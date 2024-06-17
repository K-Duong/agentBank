import { NavLink, useNavigate } from "react-router-dom";
import { useAuthState } from "../../hooks/useAuthState";
import { useUserState } from "../../hooks/useUserState";
import { useDispatchAction } from "../../hooks/useDispatchAction";
import { logingOut } from "../../features/authSlice";
import { resetUser } from "../../features/userSlice";
import logo from "../../assets/logo/argentBankLogo.png";
import "./style.scss";


function NavBar() {
  const authState = useAuthState();
  const userState = useUserState();

  const navigate = useNavigate();
  const dispatchLogingOut = useDispatchAction(logingOut);
  const dispatchResetUser = useDispatchAction(resetUser)

  const handleSignOut = () => {
    console.log("log out");
    //TODO: manually reset userInfo -> to try with middleware
    dispatchLogingOut(authState);
    dispatchResetUser(userState)
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
            <NavLink to="/profile">{userState.user.firstName}</NavLink>
            <NavLink to="/">
              <div onClick={handleSignOut}>Sign Out</div>
            </NavLink>
          </>
        ) : (
          <NavLink to="/login">Sign In</NavLink>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
