import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AdminHeroSection = ({
  onclick, lead, isAuthenticated, user
}) => (
  <div className="heroSection heroSection-admin jumbotron text-center">
    <div className="container">
      <h1 className="heroSectionMain-Text">WELCOME ORGANIZER</h1>
      <p className="lead w-50 heroSectionSub-Text pt-1">
        create some awesome meetup
      </p>
      <hr className="my-3" />
      <Link
        to={lead}
        onClick={onclick}
        className="btn w-50 heroSectionBtn btn-lg"
        href="/"
        role="button"
      >
        CREATE MEETUP
      </Link>
    </div>
  </div>
);

AdminHeroSection.propTypes = {
  onclick: PropTypes.func.isRequired,
  lead: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired
};

AdminHeroSection.defaultProps = {
  lead: ''
};

export default AdminHeroSection;
