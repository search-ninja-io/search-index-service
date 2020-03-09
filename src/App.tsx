import React, { Component } from 'react';
import './App.css';
import { withAuth, AuthProps } from './components/AuthProvider';

import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Reader from './components/Reader';

interface AppProps extends AuthProps { }

class RootApp extends Component<AppProps> {
    static displayName = RootApp.name;

    render() {
        return (
            <Layout {...this.props} >
                <Route exact path='/' component={Home} />
                <Route exact path='/reader' component={Reader} />
            </Layout>
        );
    }

}

export const App = withAuth(RootApp);
