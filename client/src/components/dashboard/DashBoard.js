import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileAction";

const DashBoard = ({ auth, profile, getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return <div>DashBoard</div>;
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
