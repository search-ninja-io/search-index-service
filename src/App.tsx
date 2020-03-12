import React, { FunctionComponent } from 'react';
import './App.css';
import { withAuth, AuthProps } from './components/AuthProvider';
import { Route } from 'react-router';

import Layout from './components/Layout';
import Home from './components/Home';
import Reader from './components/Reader';
import Token from './components/Token';
import SearchIndex from './components/SearchIndex';
import Writer from './components/Writer';
import Query from './components/Query';

interface AppProps extends AuthProps { }

const RootApp: FunctionComponent<AppProps> = (props) => {
    return (
        <Layout {...props} >
            <Route exact path='/' component={Home} />
            <Route exact path='/reader' component={Reader} />
            <Route exact path='/token' component={Token} />
            <Route exact path='/searchindex' component={SearchIndex} />
            <Route exact path='/writer' component={Writer} />
            <Route exact path='/query' component={Query} />
        </Layout>
    );
}

export const App = withAuth(RootApp);
