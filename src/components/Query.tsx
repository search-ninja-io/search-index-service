import React, { FunctionComponent, useState, useEffect } from 'react';
import { API } from 'aws-amplify';

import { AuthProps } from './AuthProvider';

interface QueryProps extends AuthProps { }

const Query: FunctionComponent<QueryProps> = () => {
    const [error, setError] = useState(undefined);
    const [data, setData] = useState({});
    const [fetching, setFetching] = useState(true);

    async function fetchData() {
        setFetching(true);
        let apiName = 'SearchIndexServiceAPI';
        let path = '/query';
        const result = await API.get(apiName, path, {})
            .then(result => setData(result))
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
                <h1>Query</h1>
                <p>Error: {JSON.stringify(error)}</p>
            </div>
        );
    }
    else if (fetching) {
        return (
            <div>
                <h1>Query</h1>
                <p>Fetching Data...</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Query</h1>
            <p>{JSON.stringify(data)}</p>
        </div>
    );

}

export default Query;