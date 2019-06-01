import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProfileRsvpCard from './ProfileRsvpCard';

const ProfileRsvpCardList = ({ userRsvp }) => {
  const rsvpList = (!(userRsvp.length === 0)) ? userRsvp.map(rsvp => <ProfileRsvpCard meetup={rsvp} />) : '0 rsvp meetups';

  return (
    <Fragment>
      {rsvpList}
    </Fragment>
  );
};

ProfileRsvpCardList.propTypes = {
  userRsvp: PropTypes.shape([]).isRequired
};
export default ProfileRsvpCardList;
