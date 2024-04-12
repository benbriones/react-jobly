import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./NavBar.css";
import { useContext } from "react";
import userContext from "./userContext";


/** Navigation bar component for Jobly.
 *
 * Props:
 * - logout(): parent function
 *
 * State: none
 *
 * App -> NavBar
 */

function NavBar({ logout }) {
  const { currentUser } = useContext(userContext);

  /** Returns JSX markup for NavBar when there exists a logged in user */
  function generateLoggedInNavBar() {
    return (
      <ul className="ms-auto navbar-nav">
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/companies" end>Companies</NavLink>
        </li>
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
        </li>
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/profile">Profile</NavLink>
        </li>
        <li className="nav-item me-4">
          <Link className="nav-link"
          to="/"
          onClick={logout}>{`Logout (${currentUser.username})`}</Link>
        </li>
      </ul>
    );
  }

  /** Returns JSX markup for NavBar when there exists a logged in user */
  function generateAnonNavBar() {
    return (
      <ul className="ms-auto navbar-nav">
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/signup">Signup</NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="NavBar navbar navbar-light sticky-top navbar-expand-md">
      <div className="container-fluid">
        <Link
          className="navbar-brand ms-2"
          to="/">
            Jobly
            <img id="joblyLogoNav" src="/newJoblyLogo.png" alt="logoNav" />
            </Link>
        {currentUser
          ? generateLoggedInNavBar()
          : generateAnonNavBar()}
      </div>
    </nav>
  );
}

export default NavBar;