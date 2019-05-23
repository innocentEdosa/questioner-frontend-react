import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SpecificMeetup from '../components/SpecificMeetup';
import Loader from '../components/Loader';
import { getSpecificMeetup } from '../store/actions/meetupsAction';
import MeetupJumbotron from '../components/MeetupJumbotron';
import SubMeetupList from '../components/SubMeetupList';
import { getRandomMeetups } from '../store/actions/homeActions';

const Meetup = ({
  loadingSpecificMeetup,
  loadingSpecificMeetupFailed,
  loadingRandomMeetups,
  onGetSpecificMeetup,
  onGetRandomMeetups,
  randomMeetups,
  match,
  meetup
}) => {
  if (loadingSpecificMeetupFailed) {
    return <Redirect to="/notfound" />;
  }
  useEffect(() => {
    onGetSpecificMeetup(match.params.id);
  }, [match.params.id]);

  useEffect(() => {
    onGetRandomMeetups(3);
  }, [match.params.id]);

  return loadingSpecificMeetup ? (
    <Loader />
  ) : (
    <div>
      <MeetupJumbotron meetup={meetup} />
      <div className="container">
        <div className="row align-items-start">
          <SpecificMeetup meetup={meetup} />
          <div className="col-md-4 offset-0 offset-md-1 mt-5 mt-md-0">
            <p className="text-uppercase font-weight-bolder heading-primary">
              More meetups
            </p>
            {loadingRandomMeetups ? (
              <Loader />
            ) : (
              <SubMeetupList meetups={randomMeetups} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  loadingSpecificMeetup: state.allMeetups.loadingSpecificMeetup,
  meetup: state.allMeetups.specificMeetup,
  loadingSpecificMeetupFailed: state.allMeetups.loadingSpecificMeetupFailed,
  loadingRandomMeetups: state.home.loadingRandomMeetups,
  randomMeetups: state.home.randomMeetups
});

const mapDispatchToProps = dispatch => ({
  onGetSpecificMeetup: id => dispatch(getSpecificMeetup(id)),
  onGetRandomMeetups: number => dispatch(getRandomMeetups(number))
});

Meetup.propTypes = {
  loadingSpecificMeetup: PropTypes.bool.isRequired,
  loadingSpecificMeetupFailed: PropTypes.bool.isRequired,
  onGetSpecificMeetup: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired,
  meetup: PropTypes.shape({}).isRequired,
  onGetRandomMeetups: PropTypes.func.isRequired,
  randomMeetups: PropTypes.shape([]).isRequired,
  loadingRandomMeetups: PropTypes.bool.isRequired
};

export default connect(mapStateToProps,
  mapDispatchToProps)(Meetup);
