import React, { Component } from 'react';
import './App.css';
import { withAuth, AuthProps } from './components/AuthProvider';

import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

interface AppProps extends AuthProps { }

class RootApp extends Component<AppProps> {
    static displayName = RootApp.name;

    render() {
        return (
            <Layout {...this.props} >
                <Route exact path='/' component={Home} />
            </Layout>
        );
    }

}

export const App = withAuth(RootApp);
