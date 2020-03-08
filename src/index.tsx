import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') || "/";
const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <App />
    </BrowserRouter >
    , rootElement);

serviceWorker.register();
