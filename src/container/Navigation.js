import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from '../components/Nav';
import { authNav } from '../store/actions/authActions';


const Navigation = ({ isAuthenticated, onNavClick }) => {
  let link;
  const structureLinks = () => {
    if (!isAuthenticated) {
      link = [
        <Link to="/Auth" onClick={() => onNavClick('login')} className="nav-item m-2  navigation-btn nav-link ">
        Log in
          {' '}
        </Link>,
        <Link to="/Auth" onClick={() => onNavClick('signup')} className="nav-item m-2  navigation-btn nav-link">
        Sign up
        </Link>
      ];
    }
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
  onNavClick: nav => dispatch(authNav(nav))
});

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onNavClick: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
