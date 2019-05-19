import React from 'react';

const Loader = () => (
  <div className="d-flex mt-5 justify-content-center">
    <div className="spinner-border" style={{ width: '4rem', height: '4rem' }} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default Loader;
