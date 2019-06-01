import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Nav = ({ children }) => {
  const [openMobileNav, setOpenMobileNav] = useState(false);

  const toggleMobileNav = () => {
    setOpenMobileNav(!openMobileNav);
  };

  return (
    <nav className="navbar navigation navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand" href="/">
          <img src="/assets/img/logo.png" width="40" height="40" alt="" />
          <span className="px-2 text-light">QUESTIONER</span>
        </Link>
        <button
          onClick={toggleMobileNav}
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
          className={
            openMobileNav
              ? 'collapse show navbar-collapse d-flex-md justify-content-md-end'
              : 'collapse navbar-collapse d-flex-md justify-content-md-end'
          }
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
              <button
                className="btn navigation-btn my-2 my-sm-0 d-none d-lg-block"
                type="submit"
              >
                Search
              </button>
            </form>
            {children}
          </div>
        </div>
      </div>
    </nav>
  );
};

Nav.propTypes = {
  children: PropTypes.oneOf(PropTypes.array).isRequired
};
export default Nav;
