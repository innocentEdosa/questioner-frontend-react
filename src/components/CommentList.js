import React from 'react';
import v4 from 'uuid';
import Comment from './Comment';

const CommentList = ({ comments }) => {
  const commentList = comments.map(comment => (
    <Comment
      key={v4()}
      comment={comment}
    />
  ));
  return commentList;
};

export default CommentList;
