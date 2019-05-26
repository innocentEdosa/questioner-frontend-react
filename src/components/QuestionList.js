import React from 'react';
import Questions from './Questions';

const QuestionList = ({ questions }) => {
  const questionsList = questions.map(question => <Questions question={question} />);
  return (
    questionsList
  );
};

export default QuestionList;
