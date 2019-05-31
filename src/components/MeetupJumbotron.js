import React from 'react';
import PropTypes from 'prop-types';
import ScheduleCard from './ScheduleCard';
import { dateFormatter } from '../helper/formatMeetup';

const MeetupJumbotron = ({
  meetup, gettingRsvp, rsvpResponse, rsvpMeetup
}) => (
  <div className="jumbotron jumbotron-fluid specificMeetup">
    <div className="container">
      <h1 className="mt-md-n2 specificMeetupMainText">{meetup.topic}</h1>
      <p className="lead specificMeetupSubText pt-1 pb-3">
        {meetup.happeningOn
          ? `happening on ${dateFormatter(meetup.happeningOn)}`
          : null}
      </p>
      <ScheduleCard
        rsvpMeetup={rsvpMeetup}
        meetup={meetup}
        rsvpResponse={rsvpResponse}
        gettingRsvp={gettingRsvp}
        style={{ width: '39%' }}
      />
    </div>
  </div>
);

MeetupJumbotron.propTypes = {
  meetup: PropTypes.shape({}).isRequired,
  gettingRsvp: PropTypes.bool.isRequired,
  rsvpResponse: PropTypes.string.isRequired,
  rsvpMeetup: PropTypes.func.isRequired
};

export default MeetupJumbotron;
