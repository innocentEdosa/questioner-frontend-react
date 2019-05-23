import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SubMeetupCard from './SubMeetupCard';

const SubMeetupList = ({ meetups }) => {
  const subMeetupList = (meetups) ? meetups.map(meetup => <SubMeetupCard meetup={meetup} />) : null;
  return (
    <Fragment>
      {subMeetupList}
    </Fragment>
  );
};

SubMeetupList.propTypes = {
  meetups: PropTypes.shape([]).isRequired,
};

export default SubMeetupList;
