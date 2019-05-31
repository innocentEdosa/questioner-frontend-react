import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SpecificMeetup from '../components/SpecificMeetup';
import Loader from '../components/Loader';
import QuestionForm from '../components/QuestionForm';
import { getSpecificMeetup } from '../store/actions/meetupsAction';
import MeetupJumbotron from '../components/MeetupJumbotron';
import SubMeetupList from '../components/SubMeetupList';
import { getRandomMeetups } from '../store/actions/homeActions';
import QuestionList from '../components/QuestionList';
import {
  createQuestion,
  getQuestions,
  upVoteQuestion,
  downVoteQuestion
} from '../store/actions/questionActions';

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
  questions,
  gettingQuestions,
  onGetQuestion,
  onUpVote,
  onDownVote
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
    const { id } = meetup;
    onGetQuestion(id);
  }, [match.params.id, meetup]);

  useEffect(() => {
    onGetRandomMeetups(3);
  }, [match.params.id]);

  const postQuestion = (question) => {
    onCreateQuestion(question, meetup.id);
  };

  const upVote = (id) => {
    onUpVote(id);
  };

  const downVote = (id) => {
    onDownVote(id);
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
            <div className="mb-n4 mt-5">
              {questions.length === 0
                ? 'No questions yet'
                : questions.length === 1
                  ? '1 question already'
                  : `${questions.length} questions already`}
            </div>
            <QuestionForm
              creatingQuestion={creatingQuestion}
              createQuestion={postQuestion}
              shouldOpen={questionFormControl.shouldOpen}
              openForm={openFormHandler}
            />
            {!gettingQuestions ? (
              <QuestionList
                downVote={downVote}
                upVote={upVote}
                questions={questions}
              />
            ) : (
              <Loader />
            )}
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
  gettingQuestions: state.question.gettingQuestions,
  questions: state.question.questions,
  upVoting: state.question.upVoting
});

const mapDispatchToProps = dispatch => ({
  onGetSpecificMeetup: id => dispatch(getSpecificMeetup(id)),
  onGetRandomMeetups: number => dispatch(getRandomMeetups(number)),
  onCreateQuestion: (question, meetupId) => dispatch(createQuestion(question, meetupId)),
  onGetQuestion: id => dispatch(getQuestions(id)),
  onUpVote: id => dispatch(upVoteQuestion(id)),
  onDownVote: id => dispatch(downVoteQuestion(id))
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
  questions: PropTypes.shape({}).isRequired,
  gettingQuestions: PropTypes.bool.isRequired,
  onGetQuestion: PropTypes.func.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(Meetup));
