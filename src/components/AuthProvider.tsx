import React, { Component, ComponentType } from 'react';
import { Hub, Auth } from 'aws-amplify';

export interface User {
    name: string;
    login: string;
}

export interface AuthData {
    isAuthenticated: boolean;
    user?: User;
}

export interface AuthProps {
    auth: AuthData;
    onSignIn: () => void;
    onSignOut: () => void;
}

interface AuthProviderProps { }

interface AuthProviderState {
    loginInProgress: boolean;
    logoutInProgress: boolean;
    isAuthenticated: boolean;
    user?: User;
    hasError: boolean;
    errorMessage?: string;
}

export function withAuth<P extends AuthProviderProps>(HocComponent: ComponentType<P>) {
    return class extends Component<AuthProviderProps, AuthProviderState> {

        state = {
            loginInProgress: false,
            logoutInProgress: false,
            isAuthenticated: false,
            user: undefined,
            hasError: false,
            errorMessage: undefined
        }

        componentDidMount() {
            Hub.listen('auth', (data) => {
                const { payload } = data
                if (payload.event === 'signIn') {
                    Auth.currentAuthenticatedUser()
                        .then(user => {
                            if (user && user.signInUserSession && user.signInUserSession.idToken && user.signInUserSession.idToken.payload) {
                                const payloadIdToken = user.signInUserSession.idToken.payload;
                                this.setState({
                                    loginInProgress: false,
                                    isAuthenticated: true,
                                    user: {
                                        login: payloadIdToken.email,
                                        name: payloadIdToken.name
                                    }
                                });
                            }
                            else {
                                this.setState({
                                    loginInProgress: false,
                                    isAuthenticated: false,
                                    user: undefined,
                                    hasError: true,
                                    errorMessage: 'Could not extract user information from ID token.'
                                })
                            }
                        })
                        .catch(error => {
                            this.setState({
                                loginInProgress: false,
                                isAuthenticated: false,
                                user: undefined,
                                hasError: true,
                                errorMessage: error
                            })
                        });
                }
                if (payload.event === 'signOut') {
                    this.setState({
                        logoutInProgress: false,
                        isAuthenticated: false,
                        user: undefined
                    });
                }
            })
        }

        onSignIn() {
            Auth.federatedSignIn()
                .then(result => {
                    this.setState({
                        loginInProgress: true
                    });
                })
                .catch(error => {
                    this.setState({
                        loginInProgress: false,
                        hasError: true,
                        errorMessage: error
                    });
                });
        }

        onSignOut() {
            Auth.signOut()
                .then(result => {
                    this.setState({
                        logoutInProgress: true
                    });
                })
                .catch(error => {
                    this.setState({
                        logoutInProgress: false,
                        hasError: true,
                        errorMessage: error
                    });
                });
        }

        render() {
            if (this.state.hasError) {
                return <div>{this.state.errorMessage}</div>;
            }
            else if (this.state.loginInProgress) {
                return <div>Login in progress...</div>;
            }
            else if (this.state.logoutInProgress) {
                return <div>Logout in progress...</div>;
            }
            return <HocComponent
                auth={this.state}
                onSignIn={() => this.onSignIn()}
                onSignOut={() => this.onSignOut()}
                {...this.props as P}
            />;
        }
    };
}