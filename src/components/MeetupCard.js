import React from 'react';
import PropTypes from 'prop-types';
import { truncate, dateFormatter } from '../helper/formatMeetup';

const MeetupCard = ({ meetup }) => (
  <div>
    <div className="card cardWrapper mt-5">
      <div className="row no-gutters">
        <div className="col-md-3">
          <img
            style={{
              minWidth: '270px',
              miWidth: '270px',
              height: '200px',
              borderRadius: '0px'
            }}
            className="card-img"
            src={
              meetup.images
                ? meetup.images
                : 'https://ui-avatars.com/api/?bold=true&background=3157BE&color=fff&name=+Questioner+Questioner'
            }
            alt=""
          />
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title, cardTitle">
              {truncate(meetup.topic, 41)}
            </h5>
            <p className="card-text">{truncate(meetup.description, 80)}</p>
            <a href="/" className="btn cardbtn  mb-n2 btn-primary">
              {' '}
              Post question
              {' '}
            </a>
          </div>
        </div>

        <div className="col-md-2 py-1 px-3">
          <div className="card text-center mt-3 cardQuestions d-none d-md-block">
            <div style={{ width: '100%' }} className="p-1">
              <p className="card-text font-weight-bold ">10</p>
              <p className="card-text mt-n2">Questions already</p>
            </div>
          </div>
          <p className="mt-3 text-center d-none d-md-block">
            <small className="text-muted">
              date:
              {' '}
              <span className="cardDate">
                {dateFormatter(meetup.happeningOn)}
              </span>
            </small>
          </p>
          <p className="mt-3 d-sm-block d-md-none">
            <small className="text-muted">
              date:
              {' '}
              <span className="cardDate">2/may/2019</span>
            </small>
          </p>
        </div>
      </div>
    </div>
  </div>
);

MeetupCard.propTypes = {
  meetup: PropTypes.shape({}).isRequired
};

export default MeetupCard;
