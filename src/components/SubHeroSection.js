import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MainHeroSection = ({
  onclick, lead, isAuthenticated, user
}) => (
  <div className="heroSection heroSection-sub jumbotron text-center">
    <div className="container">
      <h1 className="heroSectionMain-Text">
        {!isAuthenticated ? 'GET THE RIGHT ANSWERS' : 'FOUND A GREAT MEETUP?'}
      </h1>
      <p className="lead w-50 heroSectionSub-Text pt-1">
        {!isAuthenticated
          ? 'You can finally get the right answers from the organiser of meetups, if you ask the right questions'
          : 'Always be the first to ask the right question'}
      </p>
      <hr className="my-3" />
      {!isAuthenticated ? (
        <Link
          to={lead}
          onClick={onclick}
          className="btn w-50 heroSectionBtn btn-lg"
          href="/"
          role="button"
        >
          JOIN QUESTIONER
        </Link>
      ) : null}
    </div>
  </div>
);
MainHeroSection.propTypes = {
  onclick: PropTypes.func.isRequired,
  lead: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired
};
MainHeroSection.defaultProps = {
  lead: ''
};
export default MainHeroSection;
