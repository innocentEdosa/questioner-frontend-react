import React from 'react';
import PropTypes from 'prop-types';
import ScheduleCard from './ScheduleCard';
import { dateFormatter } from '../helper/formatMeetup';

const SpecificMeetup = ({
  meetup, gettingRsvp, rsvpResponse, rsvpMeetup
}) => (
  <div>
    <h3 className="text-uppercase font-weight-bolder heading-primary">
      Details
    </h3>
    <p className="meetupDetails ">{meetup.description}</p>
    <img
      src={meetup.images ? meetup.images : null}
      className="my-5 img-fluid mx-auto d-block"
      alt="..."
    />
    <div className="meetupLocation">
      <h3 className="text-uppercase font-weight-bolder heading-primary">
        Location
      </h3>
      <p className="meetupDetails">{meetup.location}</p>
    </div>
    <div className="meetupDate">
      <h3 className="text-uppercase font-weight-bolder heading-primary">
        Date
      </h3>
      <p className="meetupDetails">
        {meetup.happeningOn ? dateFormatter(meetup.happeningOn) : null}
      </p>
    </div>
    <ScheduleCard
      rsvpMeetup={rsvpMeetup}
      meetup={meetup}
      gettingRsvp={gettingRsvp}
      rsvpResponse={rsvpResponse}
      style={{ width: '100%' }}
    />
  </div>
);

SpecificMeetup.propTypes = {
  meetup: PropTypes.shape({}).isRequired,
  gettingRsvp: PropTypes.bool.isRequired,
  rsvpResponse: PropTypes.string.isRequired,
  rsvpMeetup: PropTypes.func.isRequired
};

export default SpecificMeetup;
