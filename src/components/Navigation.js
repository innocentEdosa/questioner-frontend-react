import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav className="navbar navigation navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link to="/" className="navbar-brand" href="/">
        <img src="assets/img/logo.png" width="40" height="40" alt="" />
        <span className="px-2 text-light">QUESTIONER</span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className="collapse navbar-collapse d-flex-md justify-content-md-end"
        id="navbarNavAltMarkup"
      >
        <div className="navbar-nav">
          <form className="form-inline mr-4">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn navigation-btn my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>

          <Link to="/Login" className="nav-item m-2   navigation-btn nav-link ">
            Sign in
            {' '}
          </Link>
          <Link to="/Signup" className="nav-item m-2  navigation-btn nav-link">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

export default Navigation;
