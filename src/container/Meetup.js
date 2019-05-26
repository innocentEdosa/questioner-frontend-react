import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SpecificMeetup from '../components/SpecificMeetup';
import Loader from '../components/Loader';
import QuestionForm from '../components/QuestionForm';
import { getSpecificMeetup } from '../store/actions/meetupsAction';
import MeetupJumbotron from '../components/MeetupJumbotron';
import SubMeetupList from '../components/SubMeetupList';
import { getRandomMeetups } from '../store/actions/homeActions';
import Questions from '../components/Questions';
import { createQuestion } from '../store/actions/questionActions';

const Meetup = ({
  loadingSpecificMeetup,
  loadingSpecificMeetupFailed,
  loadingRandomMeetups,
  onGetSpecificMeetup,
  onGetRandomMeetups,
  randomMeetups,
  match,
  meetup,
  creatingQuestion,
  onCreateQuestion,
  questions
}) => {
  if (loadingSpecificMeetupFailed) {
    return <Redirect to="/notfound" />;
  }

  const [questionFormControl, setQuestionFormControl] = useState({
    shouldOpen: true,
    body: ''
  });

  const openFormHandler = () => {
    const newQuestionFormControl = {
      ...questionFormControl,
      shouldOpen: !questionFormControl.shouldOpen
    };
    setQuestionFormControl(newQuestionFormControl);
  };

  useEffect(() => {
    onGetSpecificMeetup(match.params.id);
  }, [match.params.id]);

  useEffect(() => {
    onGetRandomMeetups(3);
  }, [match.params.id]);

  const postQuestion = (question) => {
    onCreateQuestion(question, meetup.id);
  };

  return loadingSpecificMeetup ? (
    <Loader />
  ) : (
    <div>
      <MeetupJumbotron meetup={meetup} />
      <div className="container">
        <div className="row align-items-start">
          <div className="col-md-7">
            <SpecificMeetup meetup={meetup} />
            <QuestionForm
              creatingQuestion={creatingQuestion}
              createQuestion={postQuestion}
              shouldOpen={questionFormControl.shouldOpen}
              openForm={openFormHandler}
            />
            <Questions question={questions} />
          </div>
          <div className="sticky-top col-md-4 offset-0 offset-md-1 mt-5 mt-md-0">
            <p className="text-uppercase font-weight-bolder heading-primary">
              More meetups
            </p>
            {loadingRandomMeetups ? (
              <Loader />
            ) : (
              <SubMeetupList meetups={randomMeetups} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  loadingSpecificMeetup: state.allMeetups.loadingSpecificMeetup,
  meetup: state.allMeetups.specificMeetup,
  loadingSpecificMeetupFailed: state.allMeetups.loadingSpecificMeetupFailed,
  loadingRandomMeetups: state.home.loadingRandomMeetups,
  randomMeetups: state.home.randomMeetups,
  creatingQuestion: state.question.creatingQuestion,
  questions: state.question.question
});

const mapDispatchToProps = dispatch => ({
  onGetSpecificMeetup: id => dispatch(getSpecificMeetup(id)),
  onGetRandomMeetups: number => dispatch(getRandomMeetups(number)),
  onCreateQuestion: (question, meetupId) => dispatch(createQuestion(question, meetupId))
});

Meetup.propTypes = {
  loadingSpecificMeetup: PropTypes.bool.isRequired,
  loadingSpecificMeetupFailed: PropTypes.bool.isRequired,
  onGetSpecificMeetup: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired,
  meetup: PropTypes.shape({}).isRequired,
  onGetRandomMeetups: PropTypes.func.isRequired,
  randomMeetups: PropTypes.shape([]).isRequired,
  loadingRandomMeetups: PropTypes.bool.isRequired,
  onCreateQuestion: PropTypes.func.isRequired,
  creatingQuestion: PropTypes.bool.isRequired,
  questions: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps,
  mapDispatchToProps)(Meetup);
