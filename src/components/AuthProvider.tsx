import React, { FunctionComponent, ComponentType, useState, useEffect } from 'react';
import { Hub, Auth } from 'aws-amplify';

export interface User {
    name: string;
    login: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user?: User;
}

export interface AuthProps {
    authState: AuthState;
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
    return (props: AuthProviderProps) => {

        const [loginInProgress, setLoginInProgress] = useState(false);
        const [logoutInProgress, setLogoutInProgress] = useState(false);
        const [authState, setAuthState] = useState<AuthState>({ isAuthenticated: false, user: undefined });
        const [error, setError] = useState({ hasError: false, errorMessage: '' });

        useEffect(() => {
            Hub.listen('auth', (data) => {
                const { payload } = data
                if (payload.event === 'signIn') {
                    Auth.currentAuthenticatedUser()
                        .then(user => {
                            if (user && user.signInUserSession && user.signInUserSession.idToken && user.signInUserSession.idToken.payload) {
                                const payloadIdToken = user.signInUserSession.idToken.payload;
                                setLoginInProgress(false);
                                setAuthState({
                                    isAuthenticated: true,
                                    user: {
                                        login: payloadIdToken.email,
                                        name: payloadIdToken.name
                                    }
                                });
                            }
                            else {
                                setLoginInProgress(false);
                                setAuthState({
                                    isAuthenticated: false,
                                    user: undefined
                                });
                                setError({
                                    hasError: true,
                                    errorMessage: 'Could not extract user information from ID token.'
                                });
                            }
                        })
                        .catch(error => {
                            setLoginInProgress(false);
                            setAuthState({ isAuthenticated: false, user: undefined });
                            setError({ hasError: true, errorMessage: error });
                        });
                }
                if (payload.event === 'signOut') {
                    setLogoutInProgress(false);
                    setAuthState({
                        isAuthenticated: false,
                        user: undefined
                    });
                }
            })
        }, []);

        const onSignIn = () => {
            Auth.federatedSignIn()
                .then(result => {
                    setLoginInProgress(true);
                })
                .catch(error => {
                    setLoginInProgress(false)
                    setError({ hasError: true, errorMessage: error });
                });
        }

        const onSignOut = () => {
            Auth.signOut()
                .then(result => {
                    setLogoutInProgress(true);
                })
                .catch(error => {
                    setAuthState({ isAuthenticated: false, user: undefined });
                    setError({ hasError: true, errorMessage: error });
                });
        }

        if (error.hasError) {
            return <div>{error.errorMessage}</div>;
        }
        else if (loginInProgress) {
            return <div>Login in progress...</div>;
        }
        else if (logoutInProgress) {
            return <div>Logout in progress...</div>;
        }
        return <HocComponent
            authState={authState}
            onSignIn={() => onSignIn()}
            onSignOut={() => onSignOut()}
            {...props as P}
        />;
    };
}