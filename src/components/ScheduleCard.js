import React from 'react';
import PropTypes from 'prop-types';

const ScheduleCard = ({ style }) => (
  <div style={style} className="specificMeetupRsvp">
    <div className="specificMeetupRsvp-back">
      <div className="btn-group" role="group" aria-label="Third group">
        <button type="button" className="btn specificMeetupRsvpBtn">
          Yes
        </button>
      </div>
      <div className="btn-group mx-4" role="group" aria-label="Third group">
        <button type="button" className="btn specificMeetupRsvpBtn">
          Maybe
        </button>
      </div>
      <div className="btn-group" role="group" aria-label="Third group">
        <button type="button" className="btn specificMeetupRsvpBtn">
          No
        </button>
      </div>
    </div>
    <div className="specificMeetupRsvp-side specificMeetupRsvp-front">
      Add to Schedule
    </div>
  </div>
);

ScheduleCard.propTypes = {
  style: PropTypes.shape({}).isRequired
};

export default ScheduleCard;
