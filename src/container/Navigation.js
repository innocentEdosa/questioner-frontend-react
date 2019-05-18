import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from '../components/Nav';
import { authNav } from '../store/actions/authActions';
import { openMeetupModal } from '../store/actions/adminActions';


const Navigation = ({ isAuthenticated, onNavClick, onCreateMeetup }) => {
  let link;
  const structureLinks = () => {
    if (!isAuthenticated) {
      return link = [
        <Link to="/Auth" onClick={() => onNavClick('login')} className="nav-item m-2  navigation-btn nav-link ">
        Log in
          {' '}
        </Link>,
        <Link to="/Auth" onClick={() => onNavClick('signup')} className="nav-item m-2  navigation-btn nav-link">
        Sign up
        </Link>,
      ];
    }
    link = [
      <Link to="/Admin" onClick={() => onCreateMeetup()} className="nav-item m-2  navigation-btn nav-link">
      Create Meetup
      </Link>
    ];
  };

  structureLinks();

  return (
    <Nav isAuthenticated={isAuthenticated}>{link}</Nav>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  onNavClick: nav => dispatch(authNav(nav)),
  onCreateMeetup: () => dispatch(openMeetupModal())
});

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onNavClick: PropTypes.func.isRequired,
  onCreateMeetup: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
