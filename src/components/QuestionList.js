import React from 'react';
import v4 from 'uuid';
import Questions from './Questions';

const QuestionList = ({ questions, upVote, downVote }) => {
  const questionsList = questions.map(question => (
    <Questions
      downVote={downVote}
      upVote={upVote}
      key={v4()}
      question={question}
    />
  ));
  return questionsList;
};

export default QuestionList;
