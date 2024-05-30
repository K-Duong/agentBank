import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/argentBankLogo.png"

import "./style.scss"
function NavBar (){
  return (
    <nav className="navbar-wrapper">
      <NavLink to="/" className="logo-container">
        <img className="logo-agentBank" alt="Argent Bank Logo" src={logo}/>
      </NavLink>
      <ul className="links">
        <NavLink to="/login">Sign In</NavLink>
        <NavLink to="/profile">Tony</NavLink>
        <NavLink to="/">Sign Out</NavLink>
      </ul>
    </nav>
  )
}

export default NavBar