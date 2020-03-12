import React, { FunctionComponent } from 'react';
import { AuthProps } from './AuthProvider';

interface HomeProps extends AuthProps { }

const Home: FunctionComponent<HomeProps> = () => {
    return (
        <div>
            <h1>Home</h1>
            <p>TBD</p>
        </div>
    );
}

export default Home;
