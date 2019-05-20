import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeroSection from '../components/HeroSection';
import MeetupList from '../components/MeetupList';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import {
  getRandomMeetups,
  getTrendingMeetups
} from '../store/actions/homeActions';
import { authNav } from '../store/actions/authActions';

const Home = ({
  loadingRandomMeetups,
  onNavClick,
  onGetTrendingMeetups,
  onGetRandomMeetups,
  randomMeetups,
  loadingTrendingMeetups,
  trendingMeetups
}) => {
  useEffect(() => {
    onGetRandomMeetups();
  }, []);

  useEffect(() => {
    onGetTrendingMeetups();
  }, []);

  const onCTAclick = () => {
    onNavClick('signup');
  };
  return (
    <div>
      <HeroSection
        mainText="CROWD SOURCE QUESTIONS"
        subText="Join Questioner, Ask the right questions and help organiser plan better for your next meetup"
        callToAction="sign up for questioner"
        height="85vh"
        paddingTop="11rem"
        onclick={onCTAclick}
        lead="/Auth"
      />
      {loadingRandomMeetups ? (
        <Loader />
      ) : (
        <div className="meetupSection">
          <div className="container" style={{ width: '90%' }}>
            <p
              className="font-weight-bolder"
              style={{
                color: 'rgba(0, 0, 0, 0.98)',
                fontSize: '1.3rem',
                letterSpacing: '.05rem'
              }}
            >
              TOP MEETUP
            </p>
            <MeetupList meetups={randomMeetups} />
            <div className="text-center mt-5 ">
              <a
                className="btn w-25 mb-5 showMoreBtn btn-lg"
                href="/"
                role="button"
              >
                Show more meetups
              </a>
            </div>
          </div>
        </div>
      )}
      <HeroSection
        mainText="GET THE RIGHT ANSWERS"
        subText="You can finally get the right answers from the organiser of meetups, if you ask the right questions"
        callToAction="join questioner"
        height="50vh"
        onclick={onCTAclick}
        lead="/Auth"
      />
      {loadingTrendingMeetups ? (
        <Loader />
      ) : (
        <div className="meetupSection">
          <div className="container" style={{ width: '90%' }}>
            <p
              className="font-weight-bolder"
              style={{
                color: 'rgba(0, 0, 0, 0.98)',
                fontSize: '1.3rem',
                letterSpacing: '.05rem'
              }}
            >
              TRENDING
            </p>
            <MeetupList meetups={trendingMeetups} />
            <div className="text-center mt-5 ">
              <a
                className="btn w-25 mb-5 showMoreBtn btn-lg"
                href="/"
                role="button"
              >
                Show more meetups
              </a>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

Home.propTypes = {
  loadingRandomMeetups: PropTypes.bool.isRequired,
  onNavClick: PropTypes.func.isRequired,
  onGetRandomMeetups: PropTypes.func.isRequired,
  onGetTrendingMeetups: PropTypes.func.isRequired,
  loadingTrendingMeetups: PropTypes.bool.isRequired,
  randomMeetups: PropTypes.shape({}).isRequired,
  trendingMeetups: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({
  loadingRandomMeetups: state.home.loadingRandomMeetups,
  loadingTrendingMeetups: state.home.loadingTrendingMeetups,
  randomMeetups: state.home.randomMeetups,
  trendingMeetups: state.home.trendingMeetups
});

const mapDispatchToProps = dispatch => ({
  onGetRandomMeetups: () => dispatch(getRandomMeetups()),
  onGetTrendingMeetups: () => dispatch(getTrendingMeetups()),
  onNavClick: nav => dispatch(authNav(nav))
});
export default connect(mapStateToProps,
  mapDispatchToProps)(Home);
