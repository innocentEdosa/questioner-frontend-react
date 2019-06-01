import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileComponent from '../components/Profile';
import { getUserRsvp } from '../store/actions/profileActions';

const Profile = ({
  user, onGetUserRsvp, gettingUserRsvp, userRsvp
}) => {
  useEffect(() => {
    onGetUserRsvp(user.id);
  }, []);

  return (
    <ProfileComponent
      gettingUserProfile={gettingUserRsvp}
      user={user}
      userRsvp={userRsvp}
    />
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  gettingUserRsvp: state.profile.gettingUserRsvp,
  userRsvp: state.profile.userRsvp
});

const mapDispatchToProps = dispatch => ({
  onGetUserRsvp: userId => dispatch(getUserRsvp(userId))
});

Profile.propTypes = {
  user: PropTypes.shape({}).isRequired,
  gettingUserRsvp: PropTypes.bool.isRequired,
  userRsvp: PropTypes.shape([]).isRequired,
  onGetUserRsvp: PropTypes.func.isRequired
};

export default connect(mapStateToProps,
  mapDispatchToProps)(Profile);
