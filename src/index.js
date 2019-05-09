import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Store from './store/index';

import './assets/bootstrap/bootstrap.min.css';
import './assets/bootstrap/jquery.min';
import './assets/sass/index.scss';
import App from './container/App';


render(<Provider store={Store}><App /></Provider>, document.getElementById('root'));
