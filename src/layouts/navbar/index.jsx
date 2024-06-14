import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logingOut } from "../../features/authSlice";
import { useGetUserProfileMutation } from "../../utils/apiSlice";
import { useAuthState } from "../../hooks";
import logo from "../../assets/logo/argentBankLogo.png";
import "./style.scss";

function NavBar() {
  // const state = useSelector((state) => state.auth);
  const authState = useAuthState();
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
  });
  const [getUserProfile] = useGetUserProfileMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (authState.isAuth) {
        try {
          const result = await getUserProfile().unwrap();
          setUserProfile((prev) => ({
            ...prev,
            firstName: result.body.firstName,
            lastName: result.body.lastName,
          }));
          console.log("Profile fetched successfully:", result);
        } catch (err) {
          console.error("Failed to fetch user profile: ", err);
        }
      }
    };
    fetchProfile();
  }, [setUserProfile, authState.isAuth]);

  

  const handleSignOut = () => {
    console.log("log out");
    dispatch(logingOut(authState));
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
            <NavLink to="/profile">{userProfile.firstName}</NavLink>
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
