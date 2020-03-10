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

const redirectSignInOptions = config.oauth.redirectSignIn.split(',');
const redirect = isLocalhost
    ? redirectSignInOptions.find(s => s.includes('localhost')) || ''
    : redirectSignInOptions.find(s => s.startsWith('https')) || '';
config.oauth.redirectSignIn = redirect;
config.oauth.redirectSignOut = redirect;

Amplify.configure(config);

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') || "/";
const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <App />
    </BrowserRouter >
    , rootElement);

serviceWorker.register();
