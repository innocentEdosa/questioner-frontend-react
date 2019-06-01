import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from '../components/Nav';
import { authNav, logOutUser } from '../store/actions/authActions';
import { openMeetupModal } from '../store/actions/adminActions';

const Navigation = ({
  isAuthenticated,
  onNavClick,
  onCreateMeetup,
  onLogOut,
  user
}) => {
  let link = [];
  const structureLinks = () => {
    if (!isAuthenticated) {
      link = [
        <Link
          to="/Auth"
          onClick={() => onNavClick('login', '/')}
          className="nav-item m-2  navigation-btn nav-link "
        >
          Log in
          {' '}
        </Link>,
        <Link
          to="/Auth"
          onClick={() => onNavClick('signup', '/')}
          className="nav-item m-2  navigation-btn nav-link"
        >
          Sign up
        </Link>
      ];
      return link;
    }
    link = [
      <Link
        to="/"
        onClick={() => onLogOut()}
        className="nav-item m-2  navigation-btn nav-link"
      >
        Log out
      </Link>,
      <Link to="/profile">
        <div className="userImage  navigation-profile  m-2">
          <img
            style={{ width: '100%', height: '100%' }}
            src={
              user.firstname === 'yourfirstname'
              && user.lastname === 'yourlastname'
                ? `https://ui-avatars.com/api/?bold=true&background=3157BE&color=fff&name=+${
                  user.username
                }`
                : `https://ui-avatars.com/api/?bold=true&background=3157BE&color=fff&name=+${
                  user.firstname
                }+${user.lastname}`
            }
            className="rounded mx-auto"
            alt="some"
          />
        </div>
      </Link>
    ];
    if (user.isAdmin === 'TRUE' && isAuthenticated) {
      link = [
        <Link
          to="/Admin"
          className="nav-item m-2  navigation-btn nav-link"
        >
        Admin
        </Link>,
        <Link
          to="/Admin"
          onClick={() => onCreateMeetup()}
          className="nav-item m-2  navigation-btn nav-link"
        >
          Create Meetup
        </Link>,
        ...link
      ];
    }
  };

  structureLinks();

  return <Nav isAuthenticated={isAuthenticated}>{link}</Nav>;
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  onNavClick: (nav, path) => dispatch(authNav(nav, path)),
  onLogOut: () => dispatch(logOutUser()),
  onCreateMeetup: () => dispatch(openMeetupModal())
});

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onNavClick: PropTypes.func.isRequired,
  onCreateMeetup: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps,
  mapDispatchToProps)(Navigation);
