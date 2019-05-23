import React from 'react';
import PropTypes from 'prop-types';
import ScheduleCard from './ScheduleCard';
import { dateFormatter } from '../helper/formatMeetup';

const MeetupJumbotron = ({ meetup }) => (
  <div className="jumbotron jumbotron-fluid specificMeetup">
    <div className="container">
      <h1 className="mt-md-n2 specificMeetupMainText">{meetup.topic}</h1>
      <p className="lead specificMeetupSubText pt-1 pb-3">
        {meetup.happeningOn
          ? `happening on ${dateFormatter(meetup.happeningOn)}`
          : null}
      </p>
      <ScheduleCard style={{ width: '39%' }} />
    </div>
  </div>
);

MeetupJumbotron.propTypes = {
  meetup: PropTypes.shape({}).isRequired
};

export default MeetupJumbotron;
