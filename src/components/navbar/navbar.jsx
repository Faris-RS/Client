import { Link } from "react-router-dom";
import React from "react";

const Navbar = ({ user }) => {
  const logout = () => {
    window.open(import.meta.env.VITE_PASSPORTLOGOUT_URL, "_self");
  };
  return (
    <div className="navbar" style={{ display: "flex" }}>
      <span className="logo"></span>
      {user ? (
        <ul className="list">
          <li className="listItem">{user.displayName}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link className="link" to="login">
          Login
        </Link>
      )}
      {/* <li className="listItem" onClick={logout}>Logout</li> */}
    </div>
  );
};

export default Navbar;
