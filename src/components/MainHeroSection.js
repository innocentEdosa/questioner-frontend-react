import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MainHeroSection = ({
  onclick,
  lead,
  isAuthenticated,
  user
}) => (
  <div
    className="heroSection heroSection-main jumbotron text-center"
  >
    <div className="container">
      <h1 className="heroSectionMain-Text">CROWD SOURCE QUESTIONS</h1>
      <p className="lead w-50 heroSectionSub-Text pt-1">{(!isAuthenticated) ? 'Join Questioner, Ask the right questions and help organizers plan better for your next meetup' : `welcome ${user.username}`}</p>
      <hr className="my-3" />
      {(!isAuthenticated) ? (
        <Link to={lead} onClick={onclick} className="btn w-50 heroSectionBtn btn-lg" href="/" role="button">
          SIGN UP FOR QUESTIONER
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
