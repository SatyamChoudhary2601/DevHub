import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileAction";
import Spinner from "../layout/spinner";

const DashBoard = ({
  getCurrentProfile,
  auth: { user },
  profile: { isLoading, profile }
}) => {
  useEffect(() => {
    setTimeout(() => {
      getCurrentProfile();
      
    }, 2000);
  }, [getCurrentProfile]);

  return isLoading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
    </Fragment>
  );
};

DashBoard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.register,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(DashBoard);
