import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MeetupList from '../components/MeetupList';
import Loader from '../components/Loader';
import { getAllMeetups } from '../store/actions/allMeetupsAction';

const AllMeetup = ({ getMeetups, gettingMeetups, meetups }) => {
  useEffect(() => {
    getMeetups();
  }, []);
  return gettingMeetups ? <Loader /> : <MeetupList meetups={meetups} />;
};

AllMeetup.propTypes = {
  getMeetups: PropTypes.func.isRequired,
  gettingMeetups: PropTypes.bool.isRequired,
  meetups: PropTypes.shape([]).isRequired
};

const mapStateToProps = state => ({
  gettingMeetups: state.AllMeetups.gettingMeetups,
  meetups: state.AllMeetups.meetups
});

const mapDispatchToProps = dispatch => ({
  getMeetups: () => dispatch(getAllMeetups())
});

export default connect(mapStateToProps,
  mapDispatchToProps)(AllMeetup);
