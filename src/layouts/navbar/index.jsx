import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/argentBankLogo.png";

import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
function NavBar() {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch;

  return (
    <nav className="navbar-wrapper">
      <NavLink to="/" className="logo-container">
        <img className="logo-agentBank" alt="Argent Bank Logo" src={logo} />
      </NavLink>
      <ul className="links">
        {isAuth ? (
          <>
            <NavLink to="/profile">Tony</NavLink>
            <NavLink to="/">Sign Out</NavLink>
          </>
        ) : (
          <NavLink to="/login">Sign In</NavLink>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
