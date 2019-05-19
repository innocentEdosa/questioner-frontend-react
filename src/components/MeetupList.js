import React from 'react';
import PropTypes from 'prop-types';
import MeetupCard from './MeetupCard';

const MeetupList = ({ meetups }) => {
  const meetupList = (meetups) ? meetups.map(meetup => <MeetupCard meetup={meetup} />) : null;
  return (
    <div className="container">
      {meetupList}
    </div>

  );
};

MeetupList.propTypes = {
  meetups: PropTypes.shape([]).isRequired,
};

export default MeetupList;
