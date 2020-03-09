import React, { Component, useState, useEffect } from 'react';
import { AuthProps } from './AuthProvider';
import { API, Auth } from 'aws-amplify';

interface ReaderProps extends AuthProps { }

interface ReaderState { }

const Reader = () => {
    const [error, setError] = useState(undefined);
    const [notebooks, setNotebooks] = useState({});
    const [fetching, setFetching] = useState(true);

    async function fetchData() {
        console.log('fetchData');
        setFetching(true);
        let apiName = 'msonenotereader';
        let path = '/token';
        let myInit = {
            headers: {
                //Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
            },
            response: true
        }
        const result = await API.get(apiName, path, myInit)
            .then(result => setNotebooks(result))
            .catch(error => setError(error));
        setFetching(false);
        return result;
    }

    useEffect(() => {
        fetchData();
    }, []);

    console.log('render: ' + fetching);
    if (error) {
        return (
            <div>
                <h1>Reader</h1>
                <p>Error: {JSON.stringify(error)}</p>
            </div>
        );
    }
    else if (fetching) {
        return (
            <div>
                <h1>Reader</h1>
                <p>Fetching Data...</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Reader</h1>
            <p>{JSON.stringify(notebooks)}</p>
        </div>
    );

}

export default Reader;
/*
    export class Reader extends Component<ReaderProps, ReaderState> {


        render() {
            try {
                return this.getData()
                    .then(result => {
                        console.log('render - result: ' + result);
                        return (
                            <div>
                                <h1>Reader</h1>
                                <p>{result}</p>
                            </div>
                        );
                    })
                    .catch(error => {
                        console.log('render - error: ' + error);
                        return (
                            <div>
                                <h1>Reader</h1>
                                <p>Error: {error}</p>
                            </div>
                        );
                    });
            }
            catch (error) {
                console.log('render - catch: ' + error);
                return (
                    <div>
                        <h1>Reader</h1>
                        <p>Error - catch: {error}</p>
                    </div>
                );
            }
        }

        async getData() {
            let apiName = 'msonenoteread';
            let path = '/token';
            let myInit = { // OPTIONAL
                headers: {} // OPTIONAL
            }
            return API.get(apiName, path, myInit)
                .then(result => { return result })
                .catch(error => { throw error });
        }


    }
*/