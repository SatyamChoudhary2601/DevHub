import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../../actions/logoutAction";
import { connect } from "react-redux";

function Navbar({ auth: { isAuthenticated, isLoading }, logout }) {
  const authLinks = (
    <ul>
      <li>
        <Link onClick={logout} to="/login">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm"></span> Logout
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!isLoading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
}
Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapstateToProps = (state) => ({
  auth: state.register
});
export default connect(mapstateToProps, { logout })(Navbar);
