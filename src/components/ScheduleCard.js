import React from 'react';
import PropTypes from 'prop-types';

const ScheduleCard = ({
  style,
  gettingRsvp,
  rsvpResponse,
  rsvpMeetup
}) => {
  const onClickHandler = (e) => {
    e.preventDefault();
    return rsvpMeetup(e.target.innerText);
  };
  return (
    <div style={style} className="specificMeetupRsvp">
      <div className="specificMeetupRsvp-back">
        <div className="btn-group" role="group" aria-label="Third group">
          <button
            onClick={onClickHandler}
            type="button"
            className="btn specificMeetupRsvpBtn"
          >
            Yes
          </button>
        </div>
        <div className="btn-group mx-4" role="group" aria-label="Third group">
          <button
            onClick={onClickHandler}
            type="button"
            className="btn specificMeetupRsvpBtn"
          >
            Maybe
          </button>
        </div>
        <div className="btn-group" role="group" aria-label="Third group">
          <button
            onClick={onClickHandler}
            type="button"
            className="btn specificMeetupRsvpBtn"
          >
            No
          </button>
        </div>
      </div>
      <div className="specificMeetupRsvp-side specificMeetupRsvp-front">
        {gettingRsvp ? (
          <span className="spinner-border text-light" role="status" />
        ) : rsvpResponse ? (
          rsvpResponse
        ) : (
          'Add to schedule'
        )}
      </div>
    </div>
  );
};

ScheduleCard.propTypes = {
  style: PropTypes.shape({}).isRequired,
  gettingRsvp: PropTypes.bool.isRequired,
  rsvpResponse: PropTypes.string.isRequired,
  rsvpMeetup: PropTypes.func.isRequired
};

export default ScheduleCard;
