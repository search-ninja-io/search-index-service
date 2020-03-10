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
        setFetching(true);
        let apiName = 'msonenotereader';
        let path = '/token';
        const result = await API.get(apiName, path, {})
            .then(result => setNotebooks(result))
            .catch(error => setError(error));
        setFetching(false);
        return result;
    }

    useEffect(() => {
        fetchData();
    }, []);

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