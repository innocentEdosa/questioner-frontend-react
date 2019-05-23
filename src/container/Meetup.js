import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SpecificMeetup from '../components/SpecificMeetup';
import Loader from '../components/Loader';
import { getSpecificMeetup } from '../store/actions/meetupsAction';

const Meetup = ({
  loadingSpecificMeetup,
  loadingSpecificMeetupFailed,
  onGetSpecificMeetup,
  match,
  meetup
}) => {
  if (loadingSpecificMeetupFailed) {
    return <Redirect to="/notfound" />;
  }
  useEffect(() => {
    onGetSpecificMeetup(match.params.id);
  }, []);

  return loadingSpecificMeetup ? (
    <Loader />
  ) : (
    <SpecificMeetup meetup={meetup} />
  );
};

const mapStateToProps = state => ({
  loadingSpecificMeetup: state.allMeetups.loadingSpecificMeetup,
  meetup: state.allMeetups.specificMeetup,
  loadingSpecificMeetupFailed: state.allMeetups.loadingSpecificMeetupFailed
});

const mapDispatchToProps = dispatch => ({
  onGetSpecificMeetup: id => dispatch(getSpecificMeetup(id))
});

Meetup.propTypes = {
  loadingSpecificMeetup: PropTypes.bool.isRequired,
  loadingSpecificMeetupFailed: PropTypes.bool.isRequired,
  onGetSpecificMeetup: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired,
  meetup: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps,
  mapDispatchToProps)(Meetup);
