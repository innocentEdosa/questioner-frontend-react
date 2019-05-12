/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Store from './store/index';

import './assets/bootstrap/bootstrap.min.css';
import './assets/bootstrap/jquery.min';
import './assets/sass/index.scss';
import App from './container/App';

render(<Provider store={Store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ,
  <ToastContainer position="top-center" hideProgressBar draggable />
</Provider>,
document.getElementById('root'));
