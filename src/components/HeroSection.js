import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HeroSection = ({
  mainText,
  subText,
  callToAction,
  height,
  paddingTop,
  onclick,
  lead
}) => (
  <div
    className="heroSection jumbotron text-center"
    style={{ height: `${height}`, paddingTop: `${paddingTop}` }}
  >
    <div className="container">
      <h1 className="heroSectionMain-Text">{mainText}</h1>
      <p className="lead w-50 heroSectionSub-Text pt-1">{subText}</p>
      <hr className="my-3" />
      <Link to={lead} onClick={onclick} className="btn w-50 heroSectionBtn btn-lg" href="/" role="button">
        {callToAction}
      </Link>
    </div>
  </div>
);

HeroSection.propTypes = {
  mainText: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  callToAction: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  paddingTop: PropTypes.string.isRequired,
  onclick: PropTypes.func.isRequired,
  lead: PropTypes.string,
};

HeroSection.defaultProps = {
  lead: ''
};

export default HeroSection;
