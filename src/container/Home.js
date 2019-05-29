import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainHeroSection from '../components/MainHeroSection';
import SubHeroSection from '../components/SubHeroSection';
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
  trendingMeetups,
  isAuthenticated,
  user
}) => {
  useEffect(() => {
    onGetRandomMeetups(4);
  }, []);

  useEffect(() => {
    onGetTrendingMeetups();
  }, []);

  const onCTAclick = () => {
    onNavClick('signup', '/');
  };
  return (
    <div>
      <MainHeroSection
        onclick={onCTAclick}
        lead="/Auth"
        isAuthenticated={isAuthenticated}
        user={user}
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
      <SubHeroSection
        isAuthenticated={isAuthenticated}
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
  trendingMeetups: PropTypes.shape({}).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({
  loadingRandomMeetups: state.home.loadingRandomMeetups,
  loadingTrendingMeetups: state.home.loadingTrendingMeetups,
  randomMeetups: state.home.randomMeetups,
  trendingMeetups: state.home.trendingMeetups,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  onGetRandomMeetups: number => dispatch(getRandomMeetups(number)),
  onGetTrendingMeetups: () => dispatch(getTrendingMeetups()),
  onNavClick: (nav, path) => dispatch(authNav(nav, path))
});
export default connect(mapStateToProps,
  mapDispatchToProps)(Home);
