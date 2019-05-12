import React from 'react';

const formatServerError = (serverError) => {
  if (typeof (serverError) === 'string') {
    serverError = { serverError };
  }
  const formattedServerError = serverError
    ? Object.keys(serverError)
      .map(error => serverError[error])
      .reduce((a, b) => a.concat(b), [])
      .map(err => <li>{err}</li>)
    : null;
  return formattedServerError;
};

export default formatServerError;
