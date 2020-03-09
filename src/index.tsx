import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Amplify from 'aws-amplify';
import config from './aws-exports';

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

if (isLocalhost) {
    config.oauth.redirectSignIn = 'http://localhost:3000/';
    config.oauth.redirectSignOut = 'http://localhost:3000/';
}


Amplify.configure(config);

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') || "/";
const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <App />
    </BrowserRouter >
    , rootElement);

serviceWorker.register();
