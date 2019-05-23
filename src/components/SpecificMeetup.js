import React from 'react';
import PropTypes from 'prop-types';
import ScheduleCard from './ScheduleCard';
import { dateFormatter } from '../helper/formatMeetup';

const SpecificMeetup = ({ meetup }) => (
  <div>
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
    <div className="container">
      <div className="row align-items-start">
        <div className=" col-md-7">
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
          <ScheduleCard style={{ width: '100%' }} />
        </div>
        <div className="col-md-4 offset-1">
          <p>this is where the sub articles would go</p>
        </div>
      </div>
    </div>
  </div>
);

SpecificMeetup.propTypes = {
  meetup: PropTypes.shape({}).isRequired
};

export default SpecificMeetup;
