import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { truncate } from '../helper/formatMeetup';

const SubMeetupCard = ({ meetup }) => (
  <Link to={`/meetup/${meetup.id}`}>
  <div className="card mb-4 subMeetupCard">
    <div
      className="p-0 m-0"
      style={{
        backgroundImage: `url('${meetup.images}')`,
        height: '120px',
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    />
    <div className="card-body">
      <p className="card-title subMeetupHeader">
        {meetup.topic ? truncate(meetup.topic, 50) : null}
      </p>
      <p className="card-text text-muted subMeetupText">
        {meetup.description ? truncate(meetup.description, 70) : null}
      </p>
    </div>
  </div>
  </Link>
);

SubMeetupCard.propTypes = {
  meetup: PropTypes.shape({}).isRequired
};

export default SubMeetupCard;
