import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <header className="header">
      <div className="logo">DashBoard</div>
      {auth ? (
        <ul>
          <li>
            <NavLink to="/">Products</NavLink>
          </li>
          <li>
            <NavLink to="/add">Add </NavLink>
          </li>
          <li>
            <NavLink to="/">Update </NavLink>
          </li>

          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/signup" onClick={logout}>
              Logout
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <NavLink to="/signup">SignUp </NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Nav;
